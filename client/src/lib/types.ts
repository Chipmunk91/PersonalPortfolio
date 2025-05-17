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
}

// Blog post type
export interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  readTime: number;
  author: string;
  date: string;
}
