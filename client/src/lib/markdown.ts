import { BlogPostType } from './types';
import fs from 'fs';
import path from 'path';

// This utility loads and processes Markdown blog posts
// Each blog post is a .md file with frontmatter metadata

/**
 * Parse front matter from Markdown content
 * Front matter is in the format:
 * ---
 * title: Post Title
 * excerpt: Post excerpt
 * ...
 * ---
 */
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

/**
 * Load a blog post file and parse its content
 */
export function loadBlogPost(filePath: string, id: number): {
  metadata: BlogPostType;
  content: string;
} {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { frontMatter, content } = parseFrontMatter(fileContent);
    
    const metadata: BlogPostType = {
      id,
      title: frontMatter.title || 'Untitled Post',
      excerpt: frontMatter.excerpt || '',
      imageUrl: frontMatter.imageUrl || '',
      category: frontMatter.category || 'uncategorized',
      readTime: parseInt(frontMatter.readTime) || 5,
      author: frontMatter.author || 'Anonymous',
      date: frontMatter.date || new Date().toLocaleDateString()
    };
    
    return { metadata, content };
  } catch (error) {
    console.error(`Error loading blog post from ${filePath}:`, error);
    throw error;
  }
}

/**
 * Load all blog posts from a directory
 */
export function loadAllBlogPosts(postsDir: string): Array<{
  id: number;
  metadata: BlogPostType;
  content: string;
  slug: string;
}> {
  try {
    const fileNames = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .sort(); // Sort alphabetically, so naming with numbers will maintain order
    
    return fileNames.map((fileName, index) => {
      const filePath = path.join(postsDir, fileName);
      const id = index + 1; // IDs start at 1
      const slug = fileName.replace(/\.md$/, '');
      
      const { metadata, content } = loadBlogPost(filePath, id);
      return { id, metadata, content, slug };
    });
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}