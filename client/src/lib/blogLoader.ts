import { BlogPostType, BlogPostTranslation } from './types';

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
// Note: In a production environment, this would use Node.js file system API to read all files in the directory
// For this demo, we'll use Vite's import.meta.glob to dynamically import all markdown files
const blogImports = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

// Convert the imported files into an array with proper ID extraction from filenames
const markdownFiles = Object.entries(blogImports).map(([path, content]) => {
  // Extract the ID from the filename pattern (e.g., 01-filename.md -> 1)
  const filename = path.split('/').pop() || '';
  const idMatch = filename.match(/^(\d+)/);
  const id = idMatch ? parseInt(idMatch[1]) : 0;
  
  return { 
    id, 
    content: content as string,
    path
  };
})
// Sort by ID
.sort((a, b) => a.id - b.id);

// Parse multilingual content from the content string
function parseMultilingualContent(content: string): Record<string, string> {
  const languageBlocks: Record<string, string> = {};
  
  // Use regex to find language blocks starting with "# langCode"
  const langSections = content.split(/\n# ([a-z]{2})\n/);
  
  if (langSections.length <= 1) {
    // No language sections found, assume the content is in English
    languageBlocks['en'] = content;
    return languageBlocks;
  }
  
  // Skip the first element which is empty or content before the first language block
  for (let i = 1; i < langSections.length; i += 2) {
    const langCode = langSections[i];
    const langContent = langSections[i+1] || '';
    languageBlocks[langCode] = langContent.trim();
  }
  
  return languageBlocks;
}

// Parse blog posts from markdown files
export const blogPosts: BlogPostType[] = markdownFiles.map(file => {
  const { frontMatter, content } = parseFrontMatter(file.content);
  const languageContents = parseMultilingualContent(content);
  
  // Extract translations from the frontmatter if available
  const translations: Record<string, BlogPostTranslation> = {};
  
  // Check if translations are defined in frontmatter
  if (frontMatter.translations) {
    try {
      const translationsData = JSON.parse(frontMatter.translations.replace(/'/g, '"'));
      Object.keys(translationsData).forEach(langCode => {
        translations[langCode] = {
          title: translationsData[langCode].title || frontMatter.title,
          excerpt: translationsData[langCode].excerpt || frontMatter.excerpt,
          content: languageContents[langCode] || ''
        };
      });
    } catch (e) {
      console.error('Error parsing translations JSON:', e);
    }
  } else {
    // For backward compatibility, create at least an English translation
    translations['en'] = {
      title: frontMatter.title,
      excerpt: frontMatter.excerpt,
      content: languageContents['en'] || content
    };
  }
  
  return {
    id: file.id,
    title: frontMatter.title,
    excerpt: frontMatter.excerpt,
    imageUrl: frontMatter.imageUrl,
    category: frontMatter.category,
    readTime: parseInt(frontMatter.readTime),
    author: frontMatter.author,
    date: frontMatter.date,
    translations
  };
});

// Get blog post content by ID and language
export function getBlogPostContent(id: number, language: string = 'en'): string {
  const post = blogPosts.find(post => post.id === id);
  if (!post) return '';
  
  // Check if the requested language exists in translations
  if (post.translations && post.translations[language] && post.translations[language].content) {
    return post.translations[language].content || '';
  }
  
  // Fallback to default language (English) or the first available translation
  if (post.translations && post.translations['en'] && post.translations['en'].content) {
    return post.translations['en'].content || '';
  }
  
  // Further fallback to any available language
  const availableLanguage = Object.keys(post.translations || {})[0];
  if (availableLanguage && post.translations[availableLanguage].content) {
    return post.translations[availableLanguage].content || '';
  }
  
  // Last resort: get raw content
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