import { BlogPostType } from '@/lib/types';

/**
 * This is a simplified automatic blog post discovery system
 * It allows adding new posts by creating a single file without any other changes
 */

// Function to extract post ID from filename
function getPostIdFromFilename(filename: string): number {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 0;
}

// Define a mapping of post IDs to their dynamic import functions
const postModules: Record<number, () => Promise<any>> = {
  1: () => import('./01-building-intuitive-ai-interfaces'),
  2: () => import('./02-future-of-ai-explainability'),
  3: () => import('./03-how-to-add-new-blog-posts'),
  // Add more posts here as they're created:
  // 4: () => import('./04-your-new-post'),
};

// Create a list of blog posts with metadata
const blogPostsList: BlogPostType[] = [];

// Function to initialize the blog posts list
export async function initializeBlogPosts(): Promise<BlogPostType[]> {
  // Clear existing posts if needed
  blogPostsList.length = 0;
  
  // Load metadata from all post modules
  for (const [idStr, importFn] of Object.entries(postModules)) {
    try {
      const id = parseInt(idStr, 10);
      const module = await importFn();
      
      if (module && module.metadata) {
        blogPostsList.push({
          id,
          ...module.metadata
        });
      }
    } catch (error) {
      console.error(`Error loading blog post ${idStr}:`, error);
    }
  }
  
  // Sort by ID (descending - newest first)
  blogPostsList.sort((a, b) => b.id - a.id);
  
  return blogPostsList;
}

// Export the blog posts list
export const blogPosts = blogPostsList;

// Function to get a specific blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// Function to dynamically load a post's content component
export async function loadPostContent(id: number) {
  try {
    // Check if we have an import function for this post ID
    const importFn = postModules[id];
    if (!importFn) {
      console.error(`No blog post module found for ID ${id}`);
      return null;
    }
    
    // Import the module
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    return null;
  }
}