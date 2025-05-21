// Timeline item type
export interface TimelineItemType {
  title: string;
  period: string;
  description: string;
}

// Skill type
export interface SkillType {
  name: string;
  category: string;
}

// Project type
export interface ProjectType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  dirName?: string;
}

// Blog post translations interface
export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content?: string;
  category?: string;
  readTime?: number;
  author?: string;
}

// Blog post type
export interface BlogPostType {
  id: number;
  imageUrl: string;
  category: string;
  readTime: number;
  author: string;
  date: string;
  translations: {
    [key: string]: BlogPostTranslation; // key is language code: 'en', 'ko', 'ja'
  };
  // Keep original title and excerpt fields for backward compatibility and default display
  title: string;
  excerpt: string;
}
