import { TimelineItemType, SkillType, ProjectType } from './types';
import { markdownBlogPosts as blogPosts } from './mdBlogLoader';

// Timeline data
export const timelineItems: TimelineItemType[] = [
  {
    title: 'Lead Data Visualization Engineer at TechCorp',
    period: '2020 - Present',
    description: 'Led a team of 5 developers creating interactive visualizations for AI-powered analytics dashboards. Reduced complexity and improved user comprehension by 43%.'
  },
  {
    title: 'Senior Frontend Developer at AI Startup',
    period: '2017 - 2020',
    description: 'Built interactive data visualization tools for machine learning models. Implemented D3.js and Three.js based solutions for model interpretability.'
  },
  {
    title: 'MSc in Data Science',
    period: '2015 - 2017',
    description: 'Specialized in visualization techniques for complex datasets. Thesis on "Interactive Visualization Methods for Neural Networks."'
  }
];

// Skills data
export const skills: SkillType[] = [
  { name: 'D3.js', category: 'visualization' },
  { name: 'Three.js', category: 'visualization' },
  { name: 'Machine Learning', category: 'ai' },
  { name: 'Neural Networks', category: 'ai' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'Python', category: 'languages' },
  { name: 'Data Analysis', category: 'data' },
  { name: 'SQL', category: 'data' },
  { name: 'UX Design', category: 'ux' },
  { name: 'Information Design', category: 'ux' }
];

// Projects data
export const projects: ProjectType[] = [
  {
    id: 1,
    title: 'Neural Network Visualizer',
    description: 'An interactive tool for visualizing neural network architectures and their decision boundaries in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['visualization', 'interactive'],
    technologies: ['D3.js', 'TensorFlow.js', 'React'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'AI Decision Explorer',
    description: 'A tool that explains AI decisions through interactive visualizations, making black-box models more transparent.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['ai', 'visualization'],
    technologies: ['Three.js', 'Python', 'Flask'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: '3D Data Explorer',
    description: 'A 3D visualization platform for exploring high-dimensional datasets through interactive projections.',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['interactive', 'visualization'],
    technologies: ['Three.js', 'WebGL', 'React'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'Natural Language Model Debugger',
    description: 'A tool for debugging and visualizing the inner workings of large language models with attention visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['ai', 'visualization', 'interactive'],
    technologies: ['React', 'D3.js', 'PyTorch'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'Financial Data Visualization Suite',
    description: 'Interactive dashboards for visualizing complex financial data with customizable charts and real-time updates.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['visualization', 'interactive'],
    technologies: ['D3.js', 'React', 'Node.js'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 6,
    title: 'Image Generation Explorer',
    description: 'A playground for exploring image generation models with adjustable parameters and real-time output.',
    imageUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['ai', 'interactive'],
    technologies: ['React', 'TensorFlow.js', 'WebGL'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 7,
    title: 'Geospatial Data Analyzer',
    description: 'An interactive map-based tool for visualizing and analyzing geospatial data with custom overlays.',
    imageUrl: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['visualization', 'interactive'],
    technologies: ['Mapbox', 'React', 'D3.js'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 8,
    title: 'Audio Waveform Visualizer',
    description: 'A real-time audio visualization tool that creates stunning visual representations of sound waves and music.',
    imageUrl: 'https://images.unsplash.com/photo-1558402529-d2638a7554c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['visualization', 'interactive'],
    technologies: ['Web Audio API', 'Canvas', 'JavaScript'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 9,
    title: 'Healthcare Data Dashboard',
    description: 'Interactive visualization tool for healthcare providers to analyze patient data and trends over time.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500',
    categories: ['visualization', 'interactive'],
    technologies: ['React', 'D3.js', 'Chart.js'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

// Export blog posts for use throughout the app
export { blogPosts };
