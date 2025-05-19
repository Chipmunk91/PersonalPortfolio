import { lazy } from 'react';
import { BlogPostType } from '@/lib/types';

// Import blog post metadata (you'll need to add new imports here)
import { metadata as post1Metadata } from './01-building-intuitive-ai-interfaces';
import { metadata as post2Metadata } from './02-future-of-ai-explainability';
import { metadata as post3Metadata } from './03-how-to-add-new-blog-posts';
// When adding a new post, import it here and add it to the blogPosts array below
// Example: import { metadata as post4Metadata } from './04-your-new-post';

// Register all blog posts with their metadata and component imports
export const blogPostRegistry = [
  { 
    id: 1, 
    metadata: post1Metadata,
    component: lazy(() => import('./01-building-intuitive-ai-interfaces'))
  },
  { 
    id: 2, 
    metadata: post2Metadata,
    component: lazy(() => import('./02-future-of-ai-explainability'))
  },
  { 
    id: 3, 
    metadata: post3Metadata,
    component: lazy(() => import('./03-how-to-add-new-blog-posts'))
  },
  // Add new blog posts here
  // { 
  //   id: 4, 
  //   metadata: post4Metadata,
  //   component: lazy(() => import('./04-your-new-post'))
  // },
];

// Export simple blog post list for metadata purposes
export const blogPosts: BlogPostType[] = blogPostRegistry.map(entry => ({
  id: entry.id,
  ...entry.metadata
}));

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

/*
  INSTRUCTIONS FOR ADDING NEW BLOG POSTS:
  
  1. Create a new file in this directory with the pattern XX-your-post-title.tsx
     - XX should be the next number in sequence (04, 05, etc.)
     - This number will become the post ID
  
  2. Copy the structure from template-new-blog-post.tsx including:
     - The metadata export (with title, excerpt, etc.)
     - The default export for the content component
  
  3. Update this index.ts file:
     - Import the metadata from your new post
     - Add an entry to the blogPosts array
  
  4. That's it! Your post will appear in listings and have its own page
*/