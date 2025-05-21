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
// For this demo, we'll use Vite's import.meta.glob to dynamically import all markdown files
const blogImports = import.meta.glob('../content/blog/**/*.md', { query: '?raw', import: 'default', eager: true });

// Convert the imported files into an array with proper ID extraction from filenames
const markdownFiles = Object.entries(blogImports).map(([path, content]) => {
  // Extract the ID from the filename pattern (e.g., 01-filename.md -> 1)
  const filename = path.split('/').pop() || '';
  const idMatch = filename.match(/^(\d+)/);
  const id = idMatch ? parseInt(idMatch[1]) : 0;
  
  // Extract language from the path (en, ja, ko)
  const pathParts = path.split('/');
  const language = pathParts[pathParts.length - 2]; // Gets language folder name
  
  return { 
    id, 
    content: content as string,
    path,
    language
  };
})
// Sort by ID
.sort((a, b) => a.id - b.id);

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
    date: frontMatter.date,
    language: file.language
  };
});

// Get blog post content by ID and language
export function getBlogPostContent(id: number, language: string = 'en'): string {
  const file = markdownFiles.find(file => file.id === id && file.language === language);
  if (!file) return '';
  
  const { content } = parseFrontMatter(file.content);
  return content;
}

// Get blog post by ID and language
export function getBlogPostById(id: number, language: string = 'en'): BlogPostType | undefined {
  return blogPosts.find(post => post.id === id && post.language === language);
}

// Get all blog posts for a specific language
export function getBlogPostsByLanguage(language: string = 'en'): BlogPostType[] {
  return blogPosts.filter(post => post.language === language);
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