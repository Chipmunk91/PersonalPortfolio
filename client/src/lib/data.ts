import { TimelineItemType, SkillType } from './types';

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

// Projects data is now loaded dynamically from projectLoader.ts
// Projects are stored in content/project/ directories

// Blog posts are now exported directly from blogLoader.ts
