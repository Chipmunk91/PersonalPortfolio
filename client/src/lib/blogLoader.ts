import { BlogPostType } from './types';

// Function to parse frontmatter from Markdown content
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

// Import markdown files from the content/blog directory
// Note: In a production environment, this would use a file system API to read all files in the directory
// For this demo, we'll manually import some files to simulate the automatic loading
import post1Content from '../content/blog/01-building-intuitive-ai-interfaces.md?raw';
import post2Content from '../content/blog/02-future-of-ai-explainability.md?raw';
import post3Content from '../content/blog/03-how-to-write-blog-posts-in-markdown.md?raw';

// List of markdown file contents
const markdownFiles = [
  { id: 1, content: post1Content },
  { id: 2, content: post2Content },
  { id: 3, content: post3Content },
];

// Parse blog posts from markdown files
export const blogPosts: BlogPostType[] = markdownFiles.map(file => {
  const { frontMatter, content } = parseFrontMatter(file.content);
  return {
    id: file.id,
    title: frontMatter.title,
    excerpt: frontMatter.excerpt,
    imageUrl: frontMatter.imageUrl,
    category: frontMatter.category,
    readTime: parseInt(frontMatter.readTime),
    author: frontMatter.author,
    date: frontMatter.date
  };
});

// Get blog post content by ID
export function getBlogPostContent(id: number): string {
  const file = markdownFiles.find(file => file.id === id);
  if (!file) return '';
  
  const { content } = parseFrontMatter(file.content);
  return content;
}

// Get blog post by ID
export function getBlogPostById(id: number): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id);
}

// In a real production environment, you would implement a function like this:
/*
export async function loadAllMarkdownFiles(): Promise<BlogPostType[]> {
  // This would use the file system API to read all .md files in the blog directory
  const files = await fs.readdir('/content/blog');
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  return Promise.all(markdownFiles.map(async (filename, index) => {
    const content = await fs.readFile(`/content/blog/${filename}`, 'utf-8');
    const { frontMatter } = parseFrontMatter(content);
    
    // Extract ID from filename (e.g., 01-title.md -> 1)
    const id = parseInt(filename.split('-')[0]);
    
    return {
      id,
      title: frontMatter.title,
      excerpt: frontMatter.excerpt,
      imageUrl: frontMatter.imageUrl,
      category: frontMatter.category,
      readTime: parseInt(frontMatter.readTime),
      author: frontMatter.author,
      date: frontMatter.date
    };
  }));
}
*/