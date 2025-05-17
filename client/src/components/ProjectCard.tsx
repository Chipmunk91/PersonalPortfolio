import { ExternalLink, Github, FileText } from 'lucide-react';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'interactive': 
        return 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200';
      case 'ai': 
        return 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200';
      case 'visualization': 
        return 'bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-200';
      default: 
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div 
      className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
      data-categories={project.categories.join(',')}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.categories[0])}`}>
            {project.categories[0].charAt(0).toUpperCase() + project.categories[0].slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <a 
            href={project.demoUrl} 
            className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          
          <div className="flex gap-4">
            <Link 
              href="/theory" 
              className="text-secondary-500 hover:text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-300 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              <FileText className="h-3 w-3" />
              <span>Theory</span>
            </Link>
            
            <a 
              href={project.githubUrl} 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              <Github className="h-3 w-3" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
