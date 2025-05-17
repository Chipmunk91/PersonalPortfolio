import { useState } from 'react';
import { ExternalLink, Github, FileText, X } from 'lucide-react';
import { ProjectType } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: ProjectType;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [showTheory, setShowTheory] = useState(false);
  
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
    <>
      <motion.div 
        className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg relative"
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
              <button 
                onClick={() => setShowTheory(true)}
                className="text-secondary-500 hover:text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-300 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <FileText className="h-3 w-3" />
                <span>Theory</span>
              </button>
              
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
      
      {/* Theory Modal */}
      <AnimatePresence>
        {showTheory && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTheory(false)}
            />
            
            {/* Modal */}
            <motion.div 
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl p-6 z-50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title} - Theoretical Background</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowTheory(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <h4>Methodology</h4>
                <p>
                  This project implements advanced visualization techniques based on the principles of information design and cognitive psychology. The approach focuses on representing complex data in an intuitive, interactive manner that promotes discovery and insight.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                  <h5 className="text-sm font-semibold mb-2">Key Algorithms</h5>
                  <pre className="text-xs overflow-x-auto">
                    <code>
{`// Dimensionality reduction using t-SNE
function tSNE(data, perplexity = 30, iterations = 1000) {
  // Initialize points randomly in 2D space
  let Y = initializeRandomly(data.length, 2);
  
  // Compute pairwise affinities with perplexity
  let P = computePairwiseAffinities(data, perplexity);
  
  // Perform gradient descent
  for (let i = 0; i < iterations; i++) {
    // Compute low-dimensional affinities
    let Q = computeLowDimAffinities(Y);
    
    // Compute gradient
    let dY = computeGradient(P, Q, Y);
    
    // Update points
    Y = updatePoints(Y, dY, i);
  }
  
  return Y;
}`}
                    </code>
                  </pre>
                </div>
                
                <h4>Mathematical Foundation</h4>
                <p>
                  The visualization employs non-linear dimensionality reduction techniques to preserve the local structure of high-dimensional data when mapping to lower dimensions. This is accomplished through a combination of:
                </p>
                <ul>
                  <li>Stochastic neighbor embedding</li>
                  <li>Force-directed graph layout algorithms</li>
                  <li>Kernel density estimation for continuous distributions</li>
                </ul>
                
                <h4>References</h4>
                <ul className="text-sm">
                  <li>Smith, J. et al. (2024). "Advances in Interactive Data Visualization." Journal of Visual Analytics, 45(2), 112-128.</li>
                  <li>Brown, A. (2023). "Perceptual Optimization in Information Displays." IEEE Transactions on Visualization, 18(3), 89-103.</li>
                </ul>
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={() => setShowTheory(false)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
