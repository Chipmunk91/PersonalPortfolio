import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { projects, getProjectById } from '@/lib/projectLoader';
import { ProjectType } from '@/lib/types';
import { ArrowLeft, Github, ExternalLink, Calendar, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

// Component for the detailed project view
export function ProjectDetail() {
  const [_, params] = useParams();
  const projectId = params?.id ? parseInt(params.id) : undefined;
  const [project, setProject] = useState<ProjectType | null>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Find the project by ID
    if (projectId) {
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject || null);
    }
  }, [projectId]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <p className="mb-4">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Link href="/projects" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to projects</span>
            </Link>
          </div>
          
          {/* Project Hero */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-primary-900 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {project.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>Live Demo</span>
                    </Button>
                  )}
                  
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <Button variant="outline" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <span>View Source</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Overview
                </h2>
                
                {/* This is where you would add your custom project content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    This is where you would add detailed information about your project. You can include:
                  </p>
                  
                  <ul>
                    <li>The problem the project solves</li>
                    <li>Your approach and methodology</li>
                    <li>Key features and functionality</li>
                    <li>Technical challenges and how you overcame them</li>
                    <li>What you learned from the project</li>
                    <li>Future improvements or iterations</li>
                  </ul>
                  
                  <p>
                    You can add as much content as you need here, including images, diagrams, code samples, and more.
                  </p>
                  
                  <h3>Key Features</h3>
                  
                  <p>
                    List and describe the main features of your project. For example:
                  </p>
                  
                  <ul>
                    <li><strong>Interactive Visualization:</strong> Real-time visualization of complex data</li>
                    <li><strong>User-friendly Interface:</strong> Intuitive controls for exploration</li>
                    <li><strong>Performance Optimization:</strong> Efficient rendering of large datasets</li>
                  </ul>
                  
                  <h3>Technical Architecture</h3>
                  
                  <p>
                    Describe the architecture and technology stack used in your project.
                  </p>
                  
                  <pre><code>
{`// Example architecture diagram or code
const architecture = {
  frontend: ['React', 'Three.js', 'TailwindCSS'],
  backend: ['Node.js', 'Express'],
  database: ['PostgreSQL'],
  deployment: ['Docker', 'AWS']
};`}
                  </code></pre>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">Timeline</h4>
                      <p className="text-gray-600 dark:text-gray-400">Jan 2023 - Mar 2023</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">Tech Stack</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {project.technologies.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Related Projects
                </h3>
                
                <div className="space-y-4">
                  {projects
                    .filter(p => p.id !== project.id && p.categories.some(cat => project.categories.includes(cat)))
                    .slice(0, 3)
                    .map(relatedProject => (
                      <Link key={relatedProject.id} href={`/project/${relatedProject.id}`}>
                        <div className="flex items-center gap-3 group">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedProject.imageUrl} 
                              alt={relatedProject.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {relatedProject.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {relatedProject.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}