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
  category?: string;
  readTime?: number;
  author?: string;
  content?: string;
}

// Blog post type
export interface BlogPostType {
  id: number;
  imageUrl: string;
  date: string;
  translations: {
    [key: string]: BlogPostTranslation; // key is language code: 'en', 'ko', 'ja'
  };
  // These fields are used as fallbacks if not specified in translations
  category?: string; 
  readTime?: number;
  author?: string;
  title?: string;
  excerpt?: string;
}
