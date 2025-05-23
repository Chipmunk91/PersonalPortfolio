Project Structure Overview
The project is a multilingual portfolio website built with modern web technologies. Here's the structure:

Frontend Structure
Core Framework: React with TypeScript
UI Components: ShadCN UI components with Tailwind CSS for styling
Routing: Wouter for lightweight client-side routing
Internationalization: i18next for multi-language support (English, Japanese, Korean)
Content Organization: Markdown-based content for blog posts and project details
Backend Structure
Server: Express.js
Database: PostgreSQL with Drizzle ORM
Storage: Database schemas for subscribers, contact messages, and user data
Email: SendGrid integration for contact form notifications
Directory Structure
/client: Frontend React application
/src/components: Reusable UI components
/src/pages: Language-specific page implementations (en, ja, ko)
/src/content: Markdown content organized by section and language
/src/contexts: React context providers (language, theme)
/src/hooks: Custom React hooks
/src/lib: Utility functions and data loaders
/server: Backend Express application
/routes.ts: API endpoints
/storage.ts: Database operations
/email.ts: Email sending functionality
/shared: Shared code between frontend and backend
/schema.ts: Database schema definitions
Content Management for Admin
Adding Blog Posts
Create new markdown files in /client/src/content/blog/[language] directories with the format:
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Hiroshi Tanaka"
image: "/images/blog/image-name.jpg"
excerpt: "Brief description of the post"
category: "Category Name"
tags: ["tag1", "tag2"]
---
Content goes here in Markdown format...
Blog posts are automatically loaded and displayed based on language selection.
Adding Projects
Add new projects in /client/src/content/projects/[language] or update the project data in /client/src/lib/data.ts (depending on implementation).
Include relevant images in /public/images/projects/.
Projects include details like title, description, technologies used, images, and links.
Updating Page Content
Core page content is defined in translation files located in /client/src/locales/[language] directories.
Change text by editing the appropriate JSON files.
For structural changes, edit the language-specific page components in /client/src/pages/[language]/.
Visitor Interaction
Contact Mechanisms
Contact Form: Visitors can submit inquiries through the contact form

Form data is stored in the database
Email notifications are sent to the administrator
Auto-replies are sent to the visitor
Newsletter Subscription: Visitors can subscribe to newsletters

Confirmation emails are sent to verify email addresses
Subscribers can unsubscribe using provided links
Meeting Scheduling: Visitors can schedule calls/meetings

Integrated with Google Calendar to show available time slots
Confirmation emails for scheduled meetings
Content Contribution
While this is primarily a portfolio site representing an individual, there are potential ways to enable visitor contribution:

Comments on Blog Posts: This could be added as a feature to enable discussions
Testimonials/References: Clients could submit testimonials that would appear in the portfolio
Future Improvements
Technical Enhancements
Performance Optimization:

Implement image lazy loading and optimization
Add server-side rendering for improved SEO
Implement caching strategies for API responses
Enhanced Mobile Experience:

Further optimize animations for mobile devices
Add mobile-specific navigation patterns
Accessibility Improvements:

Resolve the current accessibility warnings about missing dialog titles
Enhance keyboard navigation throughout the site
Improve screen reader compatibility
Feature Additions
Content Management System:

Build a custom admin panel for managing content without editing code
Implement a visual markdown editor for blog posts
Enhanced Analytics:

Add detailed visitor analytics to track page performance
Implement heat mapping to understand user engagement
Interactive Portfolio Elements:

Add more interactive demonstrations of technical skills
Develop embeddable project demos within project pages
Social Integration:

Improve social sharing capabilities
Add integration with LinkedIn or GitHub for auto-updating project details
Enhanced Chat/Support:

Implement a chatbot for common questions
Add real-time chat functionality for direct communication
Maintenance Best Practices
Regularly update dependencies to maintain security
Perform regular database backups
Monitor error logs and user feedback
Test new content on multiple devices and browsers before publishing
Development Environment
To work on this project locally:

Clone the repository
Install dependencies with npm install
Set up environment variables:
Database connection details
SendGrid API key for email functionality
Other service credentials as needed
Start the development server with npm run dev
