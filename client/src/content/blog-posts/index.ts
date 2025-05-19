import { BlogPostType } from '@/lib/types';

// Import blog post metadata (you'll need to add new imports here)
import { metadata as post1Metadata } from './01-building-intuitive-ai-interfaces';
import { metadata as post2Metadata } from './02-future-of-ai-explainability';
import { metadata as post3Metadata } from './03-how-to-add-new-blog-posts';
// When adding a new post, import it here and add it to the blogPosts array below
// Example: import { metadata as post4Metadata } from './04-your-new-post';

// Create the blog posts array with all metadata
export const blogPosts: BlogPostType[] = [
  { id: 1, ...post1Metadata },
  { id: 2, ...post2Metadata },
  { id: 3, ...post3Metadata },
  // Add new blog posts here
  // { id: 4, ...post4Metadata },
];

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