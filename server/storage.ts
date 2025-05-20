import { users, subscribers, contactMessages, type User, type InsertUser, type Subscriber, type InsertSubscriber, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  confirmSubscriber(token: string): Promise<boolean>;
  unsubscribeByToken(token: string): Promise<boolean>;
  getAllSubscribers(): Promise<Subscriber[]>;
  
  // Contact message methods
  createContactMessage(contactMessage: InsertContactMessage): Promise<ContactMessage>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private contactMessages: Map<number, ContactMessage>;
  currentId: number;
  subscriberId: number;
  contactMessageId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.contactMessages = new Map();
    this.currentId = 1;
    this.subscriberId = 1;
    this.contactMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Helper method to generate tokens
  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if already exists
    const existing = await this.getSubscriberByEmail(insertSubscriber.email);
    if (existing) {
      return existing;
    }

    const id = this.subscriberId++;
    const confirmToken = this.generateToken();
    const unsubscribeToken = this.generateToken();
    
    const now = new Date();
    
    const subscriber: Subscriber = {
      id,
      email: insertSubscriber.email,
      name: insertSubscriber.name || null,
      createdAt: now,
      confirmed: false,
      confirmToken,
      unsubscribeToken
    };
    
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      subscriber => subscriber.email === email
    );
  }

  async confirmSubscriber(token: string): Promise<boolean> {
    const entries = Array.from(this.subscribers.entries());
    for (const [id, subscriber] of entries) {
      if (subscriber.confirmToken === token) {
        const updated = {
          ...subscriber,
          confirmed: true,
          confirmToken: null 
        };
        this.subscribers.set(id, updated);
        return true;
      }
    }
    return false;
  }

  async unsubscribeByToken(token: string): Promise<boolean> {
    const entries = Array.from(this.subscribers.entries());
    for (const [id, subscriber] of entries) {
      if (subscriber.unsubscribeToken === token) {
        this.subscribers.delete(id);
        return true;
      }
    }
    return false;
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }
  
  // Contact message methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const now = new Date();
    
    const contactMessage: ContactMessage = {
      id,
      name: insertContactMessage.name,
      email: insertContactMessage.email,
      inquiryType: insertContactMessage.inquiryType,
      message: insertContactMessage.message,
      budget: insertContactMessage.budget || null,
      timeline: insertContactMessage.timeline || null,
      eventDate: insertContactMessage.eventDate || null,
      createdAt: now,
      read: false
    };
    
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async markContactMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) {
      return false;
    }
    
    const updatedMessage = {
      ...message,
      read: true
    };
    
    this.contactMessages.set(id, updatedMessage);
    return true;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    try {
      // Check if email already exists
      const existing = await this.getSubscriberByEmail(insertSubscriber.email);
      if (existing) {
        return existing;
      }

      const confirmToken = this.generateToken();
      const unsubscribeToken = this.generateToken();
      
      const [subscriber] = await db.insert(subscribers)
        .values({
          ...insertSubscriber,
          confirmToken,
          unsubscribeToken
        })
        .returning();
        
      return subscriber;
    } catch (error) {
      console.error("Error creating subscriber:", error);
      throw error;
    }
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    try {
      const [subscriber] = await db.select()
        .from(subscribers)
        .where(eq(subscribers.email, email));
      
      return subscriber;
    } catch (error) {
      console.error("Error getting subscriber by email:", error);
      throw error;
    }
  }

  async confirmSubscriber(token: string): Promise<boolean> {
    try {
      const [subscriber] = await db.select()
        .from(subscribers)
        .where(eq(subscribers.confirmToken, token));
      
      if (!subscriber) {
        return false;
      }
      
      await db.update(subscribers)
        .set({ confirmed: true, confirmToken: null })
        .where(eq(subscribers.id, subscriber.id));
      
      return true;
    } catch (error) {
      console.error("Error confirming subscriber:", error);
      return false;
    }
  }

  async unsubscribeByToken(token: string): Promise<boolean> {
    try {
      const [subscriber] = await db.select()
        .from(subscribers)
        .where(eq(subscribers.unsubscribeToken, token));
      
      if (!subscriber) {
        return false;
      }
      
      await db.delete(subscribers)
        .where(eq(subscribers.id, subscriber.id));
      
      return true;
    } catch (error) {
      console.error("Error unsubscribing:", error);
      return false;
    }
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      return await db.select().from(subscribers);
    } catch (error) {
      console.error("Error getting all subscribers:", error);
      return [];
    }
  }
  
  // Contact message methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    try {
      const [contactMessage] = await db.insert(contactMessages)
        .values(insertContactMessage)
        .returning();
      
      return contactMessage;
    } catch (error) {
      console.error("Error creating contact message:", error);
      throw error;
    }
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    try {
      const [contactMessage] = await db.select()
        .from(contactMessages)
        .where(eq(contactMessages.id, id));
      
      return contactMessage;
    } catch (error) {
      console.error("Error getting contact message:", error);
      throw error;
    }
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      return await db.select()
        .from(contactMessages)
        .orderBy(contactMessages.createdAt);
    } catch (error) {
      console.error("Error getting all contact messages:", error);
      return [];
    }
  }
  
  async markContactMessageAsRead(id: number): Promise<boolean> {
    try {
      const [updated] = await db.update(contactMessages)
        .set({ read: true })
        .where(eq(contactMessages.id, id))
        .returning();
      
      return !!updated;
    } catch (error) {
      console.error("Error marking message as read:", error);
      return false;
    }
  }
}

// Use database storage for production
export const storage = new DatabaseStorage();
