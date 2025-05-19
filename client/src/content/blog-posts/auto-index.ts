import { BlogPostType } from '@/lib/types';

// This is an automated blog post manager that dynamically discovers all blog posts
// Using this approach, adding a new blog post only requires creating a single file
// No need to manually register it anywhere else

// Get all blog post files with a numerical prefix
// This uses Vite's import.meta.glob feature which handles dynamic imports
const blogPostFiles = import.meta.glob('./*-*.tsx', { eager: true });

// Sort function for blog posts by their filename/number
function getPostNumberFromPath(path: string): number {
  const match = path.match(/\/(\d+)-/);
  return match ? parseInt(match[1], 10) : 0;
}

// Process all blog posts
const blogPostsList: BlogPostType[] = Object.entries(blogPostFiles)
  .filter(([path, module]) => {
    // Only include files that export metadata and a default component
    return 'metadata' in module && 'default' in module;
  })
  .map(([path, module]: [string, any]) => {
    // Extract metadata from the module
    const { metadata } = module;
    
    // Use the filename number as the ID
    const id = getPostNumberFromPath(path);
    
    // Return complete blog post with ID
    return {
      id,
      ...metadata
    };
  })
  .sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)

// Export the list of blog posts
export const blogPosts = blogPostsList;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// Helper to get the component path for a post by ID
export function getPostPathById(id: number): string | undefined {
  // Find the matching file path
  const entry = Object.entries(blogPostFiles).find(([path, module]: [string, any]) => {
    return getPostNumberFromPath(path) === id;
  });
  
  // Return the path if found
  return entry ? entry[0] : undefined;
}

// Export a function to dynamically import a blog post component by ID
export async function importPostComponent(id: number) {
  // Find the path for this post ID
  const path = getPostPathById(id);
  if (!path) {
    throw new Error(`No blog post found with ID ${id}`);
  }
  
  // Import the module - convert from relative path to module path
  const module = await import(/* @vite-ignore */ path.replace('./', './'));
  return module.default;
}