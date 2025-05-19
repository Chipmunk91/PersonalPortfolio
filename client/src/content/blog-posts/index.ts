import { BlogPostType } from '@/lib/types';

// This utility module dynamically manages blog posts
// Each post is in its own file with both content and metadata
// This makes it easier to add/edit/remove posts without modifying multiple files

// Import metadata from each blog post
import { metadata as post1Metadata } from './01-building-intuitive-ai-interfaces';
import { metadata as post2Metadata } from './02-future-of-ai-explainability';
import { metadata as post3Metadata } from './03-how-to-add-new-blog-posts';

// Add additional blog posts by:
// 1. Creating a new file following the pattern XX-blog-post-name.tsx
// 2. Including metadata and content in that file
// 3. Importing the metadata here
// 4. Adding it to the blogPostsWithIds array below

// Add an ID to each post's metadata
// IDs are based on the order they're listed here
const blogPostsWithIds: BlogPostType[] = [
  { id: 1, ...post1Metadata },
  { id: 2, ...post2Metadata },
  { id: 3, ...post3Metadata },
  // Add more posts here as you create them
  // Example: { id: 4, ...post4Metadata },
];

// Export the complete list of blog posts with metadata
export const blogPosts = blogPostsWithIds;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// Guide for adding new blog posts:
// 1. Create a new file in this directory (e.g., 03-your-post-title.tsx)
// 2. Copy the structure from template-new-blog-post.tsx
// 3. Add your content and metadata in that file
// 4. Import the metadata here and add it to the blogPostsWithIds array
// 5. Update the BlogPost.tsx file to include your new post in the rendering logic