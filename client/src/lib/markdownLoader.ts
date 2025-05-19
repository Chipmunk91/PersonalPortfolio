import { BlogPostType } from './types';

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

// These are the post slugs that we have available
const availablePosts = [
  '01-building-intuitive-ai-interfaces',
  '02-future-of-ai-explainability',
  '03-how-to-write-blog-posts-in-markdown'
];

// Map for caching loaded posts
const postCache: Record<string, { metadata: BlogPostType, content: string }> = {};

/**
 * Load a blog post's markdown content via import
 */
export async function loadBlogPost(slug: string, id: number): Promise<{ 
  metadata: BlogPostType; 
  content: string;
} | null> {
  try {
    // Check cache first
    if (postCache[slug]) {
      return postCache[slug];
    }
    
    // Dynamic import to get the markdown content
    // This uses Vite's support for importing text files
    const markdownModule = await import(`../content/blog-posts-md/${slug}.md?raw`);
    const markdown = markdownModule.default;
    
    // Parse the markdown
    const { frontMatter, content } = parseFrontMatter(markdown);
    
    // Create metadata object
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
    
    // Cache the result
    const result = { metadata, content };
    postCache[slug] = result;
    
    return result;
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts metadata
 */
export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  const posts: BlogPostType[] = [];
  
  for (let i = 0; i < availablePosts.length; i++) {
    const slug = availablePosts[i];
    const post = await loadBlogPost(slug, i + 1);
    if (post) {
      posts.push(post.metadata);
    }
  }
  
  return posts;
}

/**
 * Get a specific blog post by ID
 */
export async function getBlogPostById(id: number): Promise<{ 
  metadata: BlogPostType; 
  content: string; 
} | null> {
  if (id < 1 || id > availablePosts.length) {
    return null;
  }
  
  const slug = availablePosts[id - 1];
  return loadBlogPost(slug, id);
}