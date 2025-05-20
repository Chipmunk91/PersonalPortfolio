import { BlogPostType } from './types';
import fs from 'fs';
import path from 'path';

// Function to parse front matter from Markdown content
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

// Hardcoded blog posts data for now
// In a real implementation, we would load this from the filesystem
export const mdBlogPosts: BlogPostType[] = [
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

// Get blog post content by ID
export function getBlogPostContentById(id: number): string {
  // In a real implementation, this would read from the filesystem
  // For now, return some placeholder content based on ID
  switch (id) {
    case 1:
      return `# Building Intuitive AI Interfaces

Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.

## Introduction

Artificial Intelligence systems are becoming increasingly powerful, but their complexity often makes them inaccessible to non-technical users. Designing intuitive interfaces for AI tools requires a unique approach that balances technical accuracy with user-friendly experiences.

In this article, we'll explore principles and practical techniques for creating AI interfaces that anyone can use effectively, without sacrificing the power of the underlying models.`;
    
    case 2:
      return `# The Future of AI Explainability

Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.

## The Explainability Challenge

As artificial intelligence systems become increasingly complex and pervasive in our daily lives, the need to understand how they make decisions grows more urgent. This isn't just an academic concern—it's a practical necessity for AI adoption in high-stakes domains like healthcare, finance, and criminal justice.

The field of AI explainability (also called XAI, for eXplainable AI) focuses on developing methods and techniques to make AI systems more transparent, interpretable, and accountable.`;
    
    case 3:
      return `# How to Write Blog Posts in Markdown

A simple guide to creating new blog content using Markdown files - no coding required!

## The Markdown Blog System

This website uses a streamlined approach for blog posts based on Markdown files. Each post is a single \`.md\` file that includes both metadata (in the frontmatter) and the actual content in Markdown format. This makes it incredibly easy to write and manage blog content without any coding knowledge.

## What is Markdown?

Markdown is a lightweight markup language that allows you to write formatted content using a plain text editor. It's designed to be easy to write and easy to read, with simple syntax for common formatting needs.`;
    
    default:
      return `# Blog Post ${id}

This is a placeholder for blog post #${id}. No content has been added for this post yet.`;
  }
}

// Function to get a blog post by ID
export function getMdBlogPostById(id: number): BlogPostType | undefined {
  return mdBlogPosts.find(post => post.id === id);
}