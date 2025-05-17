import { TimelineItemType, SkillType, ProjectType, BlogPostType } from './types';

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
  }
];

// Blog posts data
export const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: 'Building Intuitive AI Interfaces',
    excerpt: 'Learn how to design and implement user interfaces that make AI systems more accessible and understandable to non-technical users.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 5,
    author: 'Hiroshi Tanaka',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    title: 'The Future of AI Explainability',
    excerpt: 'Exploring emerging techniques for making complex AI models more transparent and their decisions more interpretable to humans.',
    imageUrl: 'https://images.unsplash.com/photo-1488229297570-58520851e868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 8,
    author: 'Hiroshi Tanaka',
    date: 'April 3, 2023'
  },
  {
    id: 3,
    title: 'Building a Neural Network Visualizer with D3.js',
    excerpt: 'A step-by-step guide to creating an interactive visualization of neural networks using D3.js and React.',
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'case-study',
    readTime: 12,
    author: 'Hiroshi Tanaka',
    date: 'March 18, 2023'
  },
  {
    id: 4,
    title: 'Interactive Data Storytelling with Three.js',
    excerpt: 'How to use Three.js to create immersive 3D visualizations that tell compelling stories with complex datasets.',
    imageUrl: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 10,
    author: 'Hiroshi Tanaka',
    date: 'February 22, 2023'
  },
  {
    id: 5,
    title: 'Ethical Considerations in AI Visualization',
    excerpt: 'Exploring the ethical implications of how we visualize AI systems and their impact on user trust and understanding.',
    imageUrl: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 7,
    author: 'Hiroshi Tanaka',
    date: 'January 15, 2023'
  },
  {
    id: 6,
    title: 'Visualizing Transformer Models with React',
    excerpt: 'A detailed walkthrough of creating interactive visualizations for transformer-based NLP models using React and D3.',
    imageUrl: 'https://images.unsplash.com/photo-1456428746267-a1756408f782?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 15,
    author: 'Hiroshi Tanaka',
    date: 'December 10, 2022'
  },
  {
    id: 7,
    title: 'Revamping a Financial Dashboard with Data Visualization',
    excerpt: 'Case study on how we transformed a complex financial dashboard into an intuitive visual experience.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'case-study',
    readTime: 8,
    author: 'Hiroshi Tanaka',
    date: 'November 5, 2022'
  },
  {
    id: 8,
    title: 'The Psychology of Color in Data Visualization',
    excerpt: 'Understanding how color choices impact the perception and interpretation of data visualizations.',
    imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'insight',
    readTime: 6,
    author: 'Hiroshi Tanaka',
    date: 'October 18, 2022'
  },
  {
    id: 9,
    title: 'Building Accessible Data Visualizations',
    excerpt: 'Best practices for creating data visualizations that are accessible to users with different abilities.',
    imageUrl: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    category: 'tutorial',
    readTime: 9,
    author: 'Hiroshi Tanaka',
    date: 'September 25, 2022'
  }
];
