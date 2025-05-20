import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}
