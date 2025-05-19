import { BlogPostType } from './types';

// Blog post metadata with their associated Markdown content
const blogPostsData: Array<BlogPostType & { contentPath: string }> = [
  {
    id: 1,
    title: 'Building Intuitive AI Interfaces',
    excerpt: 'Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 5,
    author: 'Hiroshi Tanaka',
    date: 'May 15, 2023',
    contentPath: '01-building-intuitive-ai-interfaces'
  },
  {
    id: 2,
    title: 'The Future of AI Explainability',
    excerpt: 'Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.',
    imageUrl: 'https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 8,
    author: 'Hiroshi Tanaka',
    date: 'April 3, 2023',
    contentPath: '02-future-of-ai-explainability'
  },
  {
    id: 3,
    title: 'How to Write Blog Posts in Markdown',
    excerpt: 'A simple guide to creating new blog content using Markdown files - no coding required!',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 3,
    author: 'Admin',
    date: 'May 19, 2023',
    contentPath: '03-how-to-write-blog-posts-in-markdown'
  }
];

// Import all blog post content
import blogContent from '../content/blog-posts-md/index.js';

// Extract just the metadata for the blog post list
export const blogPosts: BlogPostType[] = blogPostsData.map(
  ({ contentPath, ...metadata }) => metadata
);

/**
 * Get a specific blog post by ID
 */
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

/**
 * Load a blog post's markdown content
 */
export async function loadBlogPostContent(id: number): Promise<string | null> {
  try {
    const post = blogPostsData.find(post => post.id === id);
    if (!post) return null;
    
    // Get the content from our imported markdown files
    const content = blogContent[post.contentPath];
    if (!content) {
      console.error(`No content found for blog post ${id} with path ${post.contentPath}`);
      return null;
    }
    
    // Remove front matter if present
    const cleanedContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    return cleanedContent;
  } catch (error) {
    console.error(`Error loading blog post ${id}:`, error);
    return null;
  }
}

/**
 * Add a new blog post to the system
 * In a real application, this would save to a database or file system
 * Here we're just adding to our in-memory array
 */
export function addBlogPost(post: Omit<BlogPostType, 'id'> & { contentPath: string }): BlogPostType {
  // Generate a new ID (max ID + 1)
  const newId = Math.max(...blogPostsData.map(p => p.id)) + 1;
  
  // Create the new post with ID
  const newPost = { ...post, id: newId };
  
  // Add to our data source
  blogPostsData.push(newPost);
  
  // Update the exported blog posts array
  blogPosts.push({ 
    id: newPost.id,
    title: newPost.title,
    excerpt: newPost.excerpt,
    imageUrl: newPost.imageUrl,
    category: newPost.category,
    readTime: newPost.readTime,
    author: newPost.author,
    date: newPost.date
  });
  
  return newPost;
}

/**
 * Get related blog posts for a specific post
 */
export function getRelatedBlogPosts(id: number, limit = 3): BlogPostType[] {
  const post = getBlogPostById(id);
  if (!post) return [];
  
  // Find posts in the same category
  return blogPosts
    .filter(p => p.id !== id && p.category === post.category)
    .slice(0, limit);
}