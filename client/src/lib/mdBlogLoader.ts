import { BlogPostType } from './types';

// Parse frontmatter from Markdown content - this is client-side only
export function parseFrontMatter(markdown: string): { 
  frontMatter: Record<string, any>;
  content: string; 
} {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontMatterRegex);
  
  if (!match) {
    return {
      frontMatter: {},
      content: markdown
    };
  }
  
  const frontMatterString = match[1];
  const content = markdown.replace(frontMatterRegex, '');
  const frontMatter: Record<string, any> = {};
  
  // Parse front matter into key-value pairs
  frontMatterString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontMatter[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return { frontMatter, content };
}

// Create blog posts in memory for the demo
// In a production system, these would be loaded from .md files stored in the content directory
export const markdownBlogPosts: BlogPostType[] = [
  {
    id: 1,
    title: 'Building Intuitive AI Interfaces',
    excerpt: 'Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 5,
    author: 'Hiroshi Tanaka',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    title: 'The Future of AI Explainability',
    excerpt: 'Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.',
    imageUrl: 'https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 8,
    author: 'Hiroshi Tanaka',
    date: 'April 3, 2023'
  },
  {
    id: 3,
    title: 'How to Write Blog Posts in Markdown',
    excerpt: 'A simple guide to creating new blog content using Markdown files - no coding required!',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 3,
    author: 'Admin',
    date: 'May 19, 2023'
  }
];

// Markdown content for each blog post - in a real app, these would be loaded from files
// These are now stored in client/src/content/blog/ directory
const markdownContent: Record<number, string> = {
  1: `---
title: Building Intuitive AI Interfaces
excerpt: Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.
imageUrl: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: tutorial
readTime: 5
author: Hiroshi Tanaka
date: May 15, 2023
---

# Building Intuitive AI Interfaces

Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.

## Introduction

Artificial Intelligence systems are becoming increasingly powerful, but their complexity often makes them inaccessible to non-technical users. Designing intuitive interfaces for AI tools requires a unique approach that balances technical accuracy with user-friendly experiences.

In this article, we'll explore principles and practical techniques for creating AI interfaces that anyone can use effectively, without sacrificing the power of the underlying models.

## Key Principles for Intuitive AI Interfaces

### 1. Progressive Disclosure

One of the most important principles when designing AI interfaces is progressive disclosure - revealing information and controls gradually as the user needs them. This prevents overwhelming users while still providing access to advanced features.

### 2. Familiar Mental Models

Use metaphors and interaction patterns that users already understand. Even when the underlying AI technology is complex, the interface should leverage existing mental models whenever possible.

### 3. Transparent Feedback

AI systems often involve uncertainty and probabilistic outcomes. Make this transparent to users without resorting to technical jargon.`,

  2: `---
title: The Future of AI Explainability
excerpt: Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.
imageUrl: https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: insight
readTime: 8
author: Hiroshi Tanaka
date: April 3, 2023
---

# The Future of AI Explainability

Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.

## The Explainability Challenge

As artificial intelligence systems become increasingly complex and pervasive in our daily lives, the need to understand how they make decisions grows more urgent. This isn't just an academic concern—it's a practical necessity for AI adoption in high-stakes domains like healthcare, finance, and criminal justice.

The field of AI explainability (also called XAI, for eXplainable AI) focuses on developing methods and techniques to make AI systems more transparent, interpretable, and accountable. In this article, we'll explore the current state of AI explainability and examine emerging approaches that promise to make even the most complex models more understandable.

## Why Explainability Matters

* **Trust:** Users are more likely to trust systems when they understand how decisions are made
* **Debugging:** Developers need to understand why systems fail to improve them
* **Compliance:** Regulations like GDPR give individuals the "right to explanation" for automated decisions`,

  3: `---
title: How to Write Blog Posts in Markdown
excerpt: A simple guide to creating new blog content using Markdown files - no coding required!
imageUrl: https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: tutorial
readTime: 3
author: Admin
date: May 19, 2023
---

# How to Write Blog Posts in Markdown

A simple guide to creating new blog content using Markdown files - no coding required!

## The Markdown Blog System

This website uses a streamlined approach for blog posts based on Markdown files. Each post is a single \`.md\` file that includes both metadata (in the frontmatter) and the actual content in Markdown format. This makes it incredibly easy to write and manage blog content without any coding knowledge.

## What is Markdown?

Markdown is a lightweight markup language that allows you to write formatted content using a plain text editor. It's designed to be easy to write and easy to read, with simple syntax for common formatting needs.

## How to Add a New Blog Post

Follow these simple steps to add a new blog post to the website:

### Step 1: Create a New Markdown File

Create a new file in the \`client/src/content/blog-posts-md/\` directory. Name it using the pattern \`XX-your-post-title.md\` where XX is the next available number (e.g., 04, 05, etc.).`
};

// Get blog post content by ID
export function getMarkdownContentById(id: number): string {
  return markdownContent[id] || `# Blog Post ${id}\n\nNo content available for this post.`;
}

// Get blog post by ID
export function getMarkdownBlogPostById(id: number): BlogPostType | undefined {
  return markdownBlogPosts.find(post => post.id === id);
}