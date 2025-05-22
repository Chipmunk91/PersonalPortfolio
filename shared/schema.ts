import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  confirmed: boolean("confirmed").default(false).notNull(),
  confirmToken: text("confirm_token"),
  unsubscribeToken: text("unsubscribe_token").notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  // Optional fields based on inquiry type
  budget: text("budget"),
  timeline: text("timeline"),
  eventDate: timestamp("event_date"),
  // Status tracking
  createdAt: timestamp("created_at").defaultNow().notNull(),
  read: boolean("read").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  email: true,
  name: true,
});

// Create the base schema
const baseContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true, 
  inquiryType: true,
  message: true,
  budget: true,
  timeline: true,
  eventDate: true,
});

// Enhance the schema with custom validation
export const insertContactMessageSchema = baseContactMessageSchema.transform((data) => {
  // Normalize inquiry type to handle different variations
  let normalizedType = data.inquiryType.toLowerCase();
  
  // Map various forms to standardized values
  if (normalizedType.includes('speak')) {
    normalizedType = 'speaking';
  } else if (normalizedType.includes('project')) {
    normalizedType = 'project';
  } else if (normalizedType.includes('collab')) {
    normalizedType = 'collaboration';
  } else {
    normalizedType = 'other';
  }
  
  // Return the normalized data
  return {
    ...data,
    inquiryType: normalizedType
  };
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
