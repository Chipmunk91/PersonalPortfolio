import { BlogPostType } from '@/lib/types';

/**
 * This is an automated blog post manager that dynamically discovers all blog posts
 * Using this approach, adding a new blog post only requires creating a single file
 * No need to manually register it anywhere else
 */

// Get all the blog post files
// Using Vite's import.meta.glob to dynamically import all matching files
const blogPostFiles = import.meta.glob('./*-*.tsx', { eager: true });

// Extract post number from file path
function getPostNumberFromPath(path: string): number {
  const match = path.match(/\/(\d+)-/);
  return match ? parseInt(match[1], 10) : 0;
}

// Process all blog posts to extract their metadata
const blogPostsList: BlogPostType[] = Object.entries(blogPostFiles)
  // Only include files that export metadata and a default component
  .filter(([_path, module]: [string, any]) => {
    return module && 'metadata' in module && 'default' in module;
  })
  .map(([path, module]: [string, any]) => {
    // Extract metadata from the module
    const { metadata } = module;
    
    // Use the filename number as the ID
    const id = getPostNumberFromPath(path);
    
    // Return the complete post with ID
    return {
      id,
      ...metadata
    };
  })
  // Sort newest first (highest ID first)
  .sort((a, b) => b.id - a.id);

// Export the list of blog posts for use in blog listings
export const blogPosts = blogPostsList;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// Find the file path for a specific post ID
function getPostFilePath(id: number): string | undefined {
  const entry = Object.entries(blogPostFiles).find(([path]) => {
    return getPostNumberFromPath(path) === id;
  });
  
  return entry ? entry[0] : undefined;
}

// Dynamically import a blog post component based on its ID
export async function importPostComponent(id: number) {
  // Get the file path for this post ID
  const path = getPostFilePath(id);
  if (!path) {
    console.error(`No blog post found with ID ${id}`);
    return null;
  }
  
  try {
    // Import the module
    const module = await import(/* @vite-ignore */ path);
    return module.default;
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    return null;
  }
}