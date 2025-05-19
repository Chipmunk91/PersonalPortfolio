import { BlogPostType } from '@/lib/types';

// This utility module dynamically manages blog posts
// Each post is in its own file with both content and metadata
// This makes it easier to add/edit/remove posts

// Import metadata from each blog post
import { metadata as post1Metadata } from './01-building-intuitive-ai-interfaces';
import { metadata as post2Metadata } from './02-future-of-ai-explainability';

// Add an ID to each post's metadata
// IDs are based on the order they're listed here
const blogPostsWithIds: BlogPostType[] = [
  { id: 1, ...post1Metadata },
  { id: 2, ...post2Metadata },
  // Add more posts here as you create them
];

// Export the complete list of blog posts with metadata
export const blogPosts = blogPostsWithIds;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// Helper to get the component path for a post by ID
export function getBlogPostComponentPath(id: number): string {
  switch (id) {
    case 1:
      return './01-building-intuitive-ai-interfaces';
    case 2:
      return './02-future-of-ai-explainability';
    // Add more cases for new blog posts
    default:
      throw new Error(`No component path defined for blog post with ID ${id}`);
  }
}