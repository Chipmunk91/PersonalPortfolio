import { BlogPostType } from '@/lib/types';
import path from 'path';
import fs from 'fs';
import { parseFrontMatter } from '@/lib/markdown';

// Directory containing Markdown blog posts
const postsDirectory = path.join(process.cwd(), 'client/src/content/blog-posts-md');

// Get all post file names (excluding template.md)
const postFileNames = fs.readdirSync(postsDirectory)
  .filter(filename => filename.endsWith('.md') && filename !== 'template.md')
  .sort(); // Sort alphabetically to maintain order

// Build the blog posts array
const blogPostsWithContent = postFileNames.map((filename, index) => {
  // Remove .md extension to get slug
  const slug = filename.replace(/\.md$/, '');
  
  // Read file content
  const fullPath = path.join(postsDirectory, filename);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  
  // Parse front matter and content
  const { frontMatter, content } = parseFrontMatter(fileContent);
  
  // Create post with ID (1-based index)
  const post: BlogPostType & { content: string } = {
    id: index + 1,
    title: frontMatter.title || 'Untitled',
    excerpt: frontMatter.excerpt || '',
    imageUrl: frontMatter.imageUrl || '',
    category: frontMatter.category || 'uncategorized',
    readTime: parseInt(frontMatter.readTime) || 5,
    author: frontMatter.author || 'Anonymous',
    date: frontMatter.date || new Date().toLocaleDateString(),
    content // Store the Markdown content
  };
  
  return post;
});

// Extract just the metadata for the blog post list
export const blogPosts: BlogPostType[] = blogPostsWithContent.map(
  ({ content, ...metadata }) => metadata
);

// Get a specific blog post by ID
export function getBlogPostById(id: number): (BlogPostType & { content: string }) | undefined {
  return blogPostsWithContent.find(post => post.id === id);
}

// Get all blog posts with content
export function getAllBlogPosts(): (BlogPostType & { content: string })[] {
  return blogPostsWithContent;
}