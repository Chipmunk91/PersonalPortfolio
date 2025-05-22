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
export function getProjectPaper(dirName: string, language: string = 'en'): string | null {
  // Try to find the language-specific paper
  let paperPath = `../content/project/${language}/${dirName}/paper.md`;
  
  // Find the paper in the imported papers
  for (const [path, content] of Object.entries(projectPapers)) {
    // Check if this is the language-specific paper by looking for /${language}/${dirName}/
    if (path.includes(`/${language}/${dirName}/`)) {
      return content as string;
    }
  }
  
  // Fallback to non-language specific paper if needed
  for (const [path, content] of Object.entries(projectPapers)) {
    if (path.includes(`/${dirName}/paper.md`) && !path.includes('/en/') && !path.includes('/ja/') && !path.includes('/ko/')) {
      return content as string;
    }
  }
  
  return null;
}

// Function to get video data for a project
export function getProjectVideo(dirName: string, language: string = 'en'): any | null {
  // Try to find the language-specific video
  let videoPath = `../content/project/${language}/${dirName}/video.json`;
  
  // Find the video in the imported videos
  for (const [path, content] of Object.entries(projectVideos)) {
    // Check if this is the language-specific video by looking for /${language}/${dirName}/
    if (path.includes(`/${language}/${dirName}/`)) {
      return content as any;
    }
  }
  
  // Fallback to non-language specific video if needed
  for (const [path, content] of Object.entries(projectVideos)) {
    if (path.includes(`/${dirName}/video.json`) && !path.includes('/en/') && !path.includes('/ja/') && !path.includes('/ko/')) {
      return content as any;
    }
  }
  
  return null;
}

// Function to get playground data for a project
export function getProjectPlayground(dirName: string, language: string = 'en'): any | null {
  // Try to find the language-specific playground
  let playgroundPath = `../content/project/${language}/${dirName}/playground/index.tsx`;
  
  // Find the playground in the imported playgrounds
  for (const [path, content] of Object.entries(projectPlaygrounds)) {
    // Check if this is the language-specific playground by looking for /${language}/${dirName}/
    if (path.includes(`/${language}/${dirName}/`)) {
      return content as any;
    }
  }
  
  // Fallback to non-language specific playground if needed
  for (const [path, content] of Object.entries(projectPlaygrounds)) {
    if (path.includes(`/${dirName}/playground/index.tsx`) && !path.includes('/en/') && !path.includes('/ja/') && !path.includes('/ko/')) {
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

// Function to get language-specific playground description
export function getPlaygroundDescription(dirName: string, language: string = 'en'): string | null {
  // Get all projects for the current language
  const languageProjects = getProjectsByLanguage(language);
  
  // Find the specific project by directory name
  const project = languageProjects.find(p => p.dirName === dirName);
  
  if (project && project.description) {
    return project.description;
  }
  
  // If no description is found in the requested language, try English as fallback
  if (language !== 'en') {
    const englishProjects = getProjectsByLanguage('en');
    const englishProject = englishProjects.find(p => p.dirName === dirName);
    if (englishProject && englishProject.description) {
      return englishProject.description;
    }
  }
  
  return null;
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