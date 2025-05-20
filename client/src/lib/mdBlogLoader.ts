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
  },
  {
    id: 4,
    title: 'Interactive 3D Data Visualization Techniques',
    excerpt: 'Discover powerful techniques for creating immersive 3D data visualizations that engage users and reveal hidden patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 7,
    author: 'Michael Chen',
    date: 'February 12, 2023'
  },
  {
    id: 5,
    title: 'Ethical Considerations in AI Development',
    excerpt: 'An exploration of the ethical challenges and responsibilities faced by AI developers in today\'s rapidly evolving technological landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 9,
    author: 'Elena Rodriguez',
    date: 'March 24, 2023'
  },
  {
    id: 6,
    title: 'Case Study: AI-Powered Healthcare Solutions',
    excerpt: 'A detailed analysis of how AI technologies are transforming patient care, diagnosis, and treatment planning in modern healthcare.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'case-study',
    readTime: 12,
    author: 'Dr. James Wilson',
    date: 'January 8, 2023'
  },
  {
    id: 7,
    title: 'Optimizing Data Dashboards for Decision Makers',
    excerpt: 'Learn how to design data dashboards that provide actionable insights for executives and decision makers across organizations.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 5,
    author: 'Thomas Wright',
    date: 'May 5, 2023'
  },
  {
    id: 8,
    title: 'The Convergence of AI and IoT: New Opportunities',
    excerpt: 'Exploring how the integration of artificial intelligence with Internet of Things devices is creating new possibilities for smart systems.',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 8,
    author: 'Sophia Kim',
    date: 'April 17, 2023'
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

Create a new file in the \`client/src/content/blog/\` directory. Name it using the pattern \`XX-your-post-title.md\` where XX is the next available number (e.g., 04, 05, etc.).`,

  4: `---
title: Interactive 3D Data Visualization Techniques
excerpt: Discover powerful techniques for creating immersive 3D data visualizations that engage users and reveal hidden patterns.
imageUrl: https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: tutorial
readTime: 7
author: Michael Chen
date: February 12, 2023
---

# Interactive 3D Data Visualization Techniques

## Beyond 2D: Entering the Third Dimension

Data visualization has traditionally been confined to two dimensions, but as datasets grow more complex, 3D visualizations offer powerful new ways to explore and understand information. This article explores techniques for creating effective 3D data visualizations.

## Key Benefits of 3D Visualization

3D visualizations can provide several advantages over traditional 2D approaches:

1. **Additional data dimension**: The z-axis allows for representing an additional variable
2. **Spatial relationships**: Better representation of inherently 3D data (geographic, molecular, etc.)
3. **Engagement**: Enhanced user interest and interaction with data
4. **Pattern recognition**: Some patterns are more easily detected in 3D space

## Effective 3D Visualization Techniques

### 1. 3D Scatter Plots

3D scatter plots extend the familiar 2D version by adding a z-axis, allowing you to plot three variables simultaneously. This can reveal correlations and clusters that might be hidden in 2D representations.`,

  5: `---
title: Ethical Considerations in AI Development
excerpt: An exploration of the ethical challenges and responsibilities faced by AI developers in today's rapidly evolving technological landscape.
imageUrl: https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: insight
readTime: 9
author: Elena Rodriguez
date: March 24, 2023
---

# Ethical Considerations in AI Development

## The Growing Importance of AI Ethics

As artificial intelligence systems become increasingly integrated into critical aspects of our lives—from healthcare and criminal justice to finance and employment—the ethical dimensions of AI development have moved from theoretical concerns to practical imperatives.

## Major Ethical Challenges in AI

### 1. Bias and Fairness

AI systems learn from data, and when that data reflects historical biases, the resulting models can perpetuate or even amplify these biases. This has already led to documented cases of discrimination in areas like hiring, loan approval, and criminal risk assessment.

### 2. Privacy and Surveillance

The data hunger of modern AI systems raises serious privacy concerns. From facial recognition to behavior prediction, AI technologies are enabling unprecedented surveillance capabilities that challenge fundamental notions of privacy.`,

  6: `---
title: Case Study: AI-Powered Healthcare Solutions
excerpt: A detailed analysis of how AI technologies are transforming patient care, diagnosis, and treatment planning in modern healthcare.
imageUrl: https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: case-study
readTime: 12
author: Dr. James Wilson
date: January 8, 2023
---

# Case Study: AI-Powered Healthcare Solutions

## Introduction

The healthcare industry stands at a transformative crossroads, with artificial intelligence technologies reshaping how medical professionals diagnose conditions, plan treatments, and deliver care. This case study examines several groundbreaking implementations of AI in healthcare settings.

## Case 1: Early Disease Detection through Medical Imaging

### Background

RadNet, a leading radiology center with over 350 facilities, faced challenges in consistently identifying early-stage breast cancers in mammography images. With radiologists reviewing hundreds of images daily, subtle indicators were occasionally missed.

### AI Implementation

In 2021, RadNet deployed a deep learning system trained on over 3 million mammograms to assist radiologists. The AI system pre-screens images, highlighting regions with suspicious features for radiologist review.`,

  7: `---
title: Optimizing Data Dashboards for Decision Makers
excerpt: Learn how to design data dashboards that provide actionable insights for executives and decision makers across organizations.
imageUrl: https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: tutorial
readTime: 5
author: Thomas Wright
date: May 5, 2023
---

# Optimizing Data Dashboards for Decision Makers

## Introduction

Data dashboards have become essential tools for decision makers across industries, providing at-a-glance views of key performance indicators. However, many dashboards fail to deliver actionable insights, overwhelm users with information, or miss critical context.

## Understanding Your Audience

Before designing any dashboard, you must understand who will be using it and for what purpose:

### Executive Decision Makers

- Need high-level metrics with the ability to drill down
- Focus on indicators that directly relate to strategic goals
- Value comparative data (vs. targets, previous periods, competitors)
- Have limited time to analyze data`,

  8: `---
title: The Convergence of AI and IoT: New Opportunities
excerpt: Exploring how the integration of artificial intelligence with Internet of Things devices is creating new possibilities for smart systems.
imageUrl: https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400
category: insight
readTime: 8
author: Sophia Kim
date: April 17, 2023
---

# The Convergence of AI and IoT: New Opportunities

## Introduction

The Internet of Things (IoT) and Artificial Intelligence (AI) represent two of the most transformative technologies of our era. While each is powerful independently, their convergence—often called AIoT (Artificial Intelligence of Things)—is creating unprecedented opportunities for innovation across industries.

## The Complementary Nature of AI and IoT

IoT and AI complement each other in fundamental ways:

**IoT provides:**
- Vast amounts of real-world data from distributed sensors
- The ability to monitor environments continuously
- Physical actuation capabilities to affect the world

**AI provides:**
- Methods to extract meaningful patterns from complex data
- Predictive capabilities based on historical information
- Decision-making systems that improve over time`
};

// Get blog post content by ID
export function getMarkdownContentById(id: number): string {
  return markdownContent[id] || `# Blog Post ${id}\n\nNo content available for this post.`;
}

// Get blog post by ID
export function getMarkdownBlogPostById(id: number): BlogPostType | undefined {
  return markdownBlogPosts.find(post => post.id === id);
}