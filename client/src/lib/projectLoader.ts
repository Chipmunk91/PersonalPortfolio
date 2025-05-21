import { ProjectType } from './types';

// Import project index files
const projectIndices = import.meta.glob('../content/project/**/*.json', { eager: true });
const projectPapers = import.meta.glob('../content/project/**/paper.md', { query: '?raw', import: 'default', eager: true });
const projectVideos = import.meta.glob('../content/project/**/video.json', { eager: true });
const projectPlaygrounds = import.meta.glob('../content/project/**/playground/index.tsx', { eager: true });

// Parse project data from the project directories
export const projects: ProjectType[] = Object.entries(projectIndices)
  .filter(([path]) => path.includes('/index.json'))
  .map(([path, content]) => {
  // Extract project directory name and language
  const dirPath = path.substring(0, path.lastIndexOf('/'));
  const dirName = dirPath.substring(dirPath.lastIndexOf('/') + 1);
  
  // Extract language from path (en/ja/ko)
  const pathParts = path.split('/');
  // Path format: "../content/project/en/projectname/index.json" => language is at position -3
  const language = pathParts[pathParts.length - 3];
  
  // Get the project data from index.json
  const projectData = content as any;
  
  return {
    id: projectData.id,
    title: projectData.title,
    description: projectData.description,
    imageUrl: projectData.imageUrl,
    categories: projectData.categories,
    technologies: projectData.technologies,
    demoUrl: projectData.demoUrl,
    githubUrl: projectData.githubUrl,
    dirName: dirName,
    language: language
  };
}).sort((a, b) => a.id - b.id);

// Function to get paper content for a project
export function getProjectPaper(dirName: string): string | null {
  const paperPath = `../content/project/${dirName}/paper.md`;
  
  // Find the paper in the imported papers
  for (const [path, content] of Object.entries(projectPapers)) {
    if (path.includes(dirName)) {
      return content as string;
    }
  }
  
  return null;
}

// Function to get video data for a project
export function getProjectVideo(dirName: string): any | null {
  const videoPath = `../content/project/${dirName}/video.json`;
  
  // Find the video in the imported videos
  for (const [path, content] of Object.entries(projectVideos)) {
    if (path.includes(dirName)) {
      return content as any;
    }
  }
  
  return null;
}

// Function to get playground data for a project
export function getProjectPlayground(dirName: string): any | null {
  const playgroundPath = `../content/project/${dirName}/playground/index.tsx`;
  
  // Find the playground in the imported playgrounds
  for (const [path, content] of Object.entries(projectPlaygrounds)) {
    if (path.includes(dirName)) {
      return content as any;
    }
  }
  
  return null;
}

// Function to get a project by ID
export function getProjectById(id: number): ProjectType | undefined {
  return projects.find(project => project.id === id);
}

// Function to get a project by directory name
export function getProjectByDirName(dirName: string): ProjectType | undefined {
  return projects.find(project => project.dirName === dirName);
}

// Function to get projects by language
export function getProjectsByLanguage(language: string = 'en'): ProjectType[] {
  return projects.filter(project => {
    // If language is specified in the project data, use that
    if (project.language) {
      return project.language === language;
    }
    // Default to English if not specified
    return language === 'en';
  });
}

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