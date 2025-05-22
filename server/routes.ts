import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema, insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { 
  createCalendarClient, 
  getCalendarCredentials,
  getAvailableTimeslots,
  createCalendarEvent 
} from "./calendar";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertSubscriberSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid subscription data", 
          errors: validatedData.error.format() 
        });
      }
      
      const subscriber = await storage.createSubscriber(validatedData.data);
      
      // In a real system, we would send a confirmation email here
      // with a link containing the confirmToken
      
      return res.status(201).json({ 
        success: true, 
        message: "Subscription successful", 
        // Don't expose the tokens in the response
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
          confirmed: subscriber.confirmed
        }
      });
    } catch (error) {
      console.error("Error in subscription:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error processing subscription" 
      });
    }
  });
  
  // Confirm subscription endpoint
  app.get("/api/newsletter/confirm/:token", async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ 
          success: false, 
          message: "Confirmation token is required" 
        });
      }
      
      const success = await storage.confirmSubscriber(token);
      
      if (success) {
        return res.status(200).json({ 
          success: true, 
          message: "Email confirmed successfully" 
        });
      } else {
        return res.status(404).json({ 
          success: false, 
          message: "Invalid or expired confirmation token" 
        });
      }
    } catch (error) {
      console.error("Error in confirmation:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error processing confirmation" 
      });
    }
  });
  
  // Unsubscribe endpoint
  app.get("/api/newsletter/unsubscribe/:token", async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      
      if (!token) {
        return res.status(400).json({ 
          success: false, 
          message: "Unsubscribe token is required" 
        });
      }
      
      const success = await storage.unsubscribeByToken(token);
      
      if (success) {
        return res.status(200).json({ 
          success: true, 
          message: "Successfully unsubscribed" 
        });
      } else {
        return res.status(404).json({ 
          success: false, 
          message: "Invalid unsubscribe token" 
        });
      }
    } catch (error) {
      console.error("Error in unsubscribe:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error processing unsubscribe request" 
      });
    }
  });
  
  // Get all subscribers (for admin purposes, would typically be protected)
  app.get("/api/newsletter/subscribers", async (_req: Request, res: Response) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      
      return res.status(200).json({ 
        success: true, 
        subscribers: subscribers.map(s => ({
          id: s.id,
          email: s.email,
          name: s.name,
          confirmed: s.confirmed,
          createdAt: s.createdAt
        }))
      });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error fetching subscribers" 
      });
    }
  });
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = insertContactMessageSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid contact form data",
          errors: validatedData.error.format()
        });
      }
      
      // Store the contact message in the database
      const contactMessage = await storage.createContactMessage(validatedData.data);
      
      // Import the email functions
      const { sendContactNotification, sendContactAutoReply } = await import('./email');
      
      // Send notification email to admin (site owner)
      const notificationSent = await sendContactNotification({
        name: contactMessage.name,
        email: contactMessage.email,
        inquiryType: contactMessage.inquiryType,
        message: contactMessage.message,
        budget: contactMessage.budget,
        timeline: contactMessage.timeline,
        eventDate: contactMessage.eventDate ? contactMessage.eventDate.toISOString() : null
      });
      
      // Send auto-reply email to the person who submitted the form
      const autoReplySent = await sendContactAutoReply({
        name: contactMessage.name,
        email: contactMessage.email
      });
      
      // Log email notification status
      if (!notificationSent) {
        console.warn("Failed to send contact notification email to admin");
      }
      
      if (!autoReplySent) {
        console.warn("Failed to send auto-reply email to user");
      }
      
      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        contactId: contactMessage.id,
        emailStatus: {
          notificationSent,
          autoReplySent
        }
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({
        success: false,
        message: "Server error processing your message"
      });
    }
  });
  
  // Get all contact messages (admin only, would typically be protected)
  app.get("/api/contact/messages", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getAllContactMessages();
      
      return res.status(200).json({
        success: true,
        messages
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        success: false,
        message: "Server error fetching contact messages"
      });
    }
  });
  
  // Mark a contact message as read
  app.patch("/api/contact/messages/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid message ID"
        });
      }
      
      const success = await storage.markContactMessageAsRead(id);
      
      if (success) {
        return res.status(200).json({
          success: true,
          message: "Message marked as read"
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Message not found"
        });
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      return res.status(500).json({
        success: false,
        message: "Server error updating message"
      });
    }
  });

  // Calendar API Endpoints
  
  // Get available timeslots for scheduling
  app.get("/api/calendar/available", async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
      
      if (!date || typeof date !== 'string') {
        return res.status(400).json({
          success: false,
          message: "Date parameter is required (YYYY-MM-DD format)"
        });
      }
      
      // Create calendar client with credentials
      const credentials = getCalendarCredentials();
      const calendar = createCalendarClient(credentials);
      
      // Get available timeslots for the selected date
      const availableSlots = await getAvailableTimeslots(calendar, date);
      
      return res.status(200).json({
        success: true,
        availableSlots
      });
    } catch (error) {
      console.error("Error fetching available slots:", error);
      return res.status(500).json({
        success: false,
        message: "Server error fetching available slots"
      });
    }
  });
  
  // Book a calendar slot
  app.post("/api/calendar/book", async (req: Request, res: Response) => {
    try {
      const { startTime, name, email, topic } = req.body;
      
      // Validation
      if (!startTime || !name || !email || !topic) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields (startTime, name, email, topic)"
        });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address"
        });
      }
      
      // Parse start time and calculate end time (30 min meeting)
      const start = new Date(startTime);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);
      
      // Create calendar client with credentials
      const credentials = getCalendarCredentials();
      const calendar = createCalendarClient(credentials);
      
      // Create the calendar event
      const eventId = await createCalendarEvent(
        calendar,
        start.toISOString(),
        end.toISOString(),
        `Meeting with ${name}`,
        `Topic: ${topic}`,
        email
      );
      
      return res.status(201).json({
        success: true,
        message: "Meeting scheduled successfully",
        eventId
      });
    } catch (error) {
      console.error("Error booking calendar slot:", error);
      return res.status(500).json({
        success: false,
        message: "Server error scheduling meeting"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
