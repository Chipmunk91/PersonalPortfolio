import { useState } from 'react';
import { ExternalLink, Github, FileText, PlayCircle } from 'lucide-react';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { getProjectPaper, getProjectVideo } from '@/lib/projectLoader';
import { useLanguage } from '@/contexts/LanguageContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  onSelect?: (project: ProjectType) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [showTheory, setShowTheory] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [location] = useLocation();
  
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

  // Handle project card click to select for embedded playground
  const handleProjectClick = (e: React.MouseEvent) => {
    // Prevent click if we clicked on one of the buttons/links
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    
    // Update the parent component with this project
    if (onSelect) {
      onSelect(project);
    }
  };
  
  // Handle image click for video preview
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideoModal(true);
  };

  return (
    <>
      <motion.div 
        className="project-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
        data-categories={project.categories.join(',')}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onClick={handleProjectClick}
      >
        <div className="relative">
          <div 
            className="cursor-pointer" 
            onClick={handleImageClick}
          >
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col h-[280px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(project.categories[0].toLowerCase())}`}>
              {project.categories[0].charAt(0).toUpperCase() + project.categories[0].slice(1)}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4 flex-1">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between mt-auto">
            <a 
              href={project.demoUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live Demo</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            
            <div className="flex gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTheory(true);
                }}
                className="text-secondary-500 hover:text-secondary-600 dark:text-secondary-400 dark:hover:text-secondary-300 font-medium text-sm flex items-center gap-1 transition-colors"
              >
                <FileText className="h-3 w-3" />
                <span>Paper</span>
              </button>
              
              <a 
                href={project.githubUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm flex items-center gap-1 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3 w-3" />
                <span>Source</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Paper Modal */}
      <Dialog open={showTheory} onOpenChange={setShowTheory}>
        <DialogContent className="w-full sm:w-[80vw] sm:max-w-[80%] max-h-[80vh] overflow-y-auto" style={{ maxWidth: "80%" }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{project.title} - Research Paper</DialogTitle>
          </DialogHeader>
          
          <div className="prose dark:prose-invert max-w-none mt-4">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-primary-700 dark:text-primary-300 mb-3">Methodology</h4>
              <p className="text-gray-800 dark:text-gray-200">
                This project implements advanced visualization techniques based on the principles of information design and cognitive psychology. The approach focuses on representing complex data in an intuitive, interactive manner that promotes discovery and insight.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg my-6 border-l-4 border-secondary-500">
              <h5 className="text-md font-semibold mb-3 text-secondary-700 dark:text-secondary-300">Key Algorithms</h5>
              <pre className="text-xs overflow-x-auto bg-white dark:bg-gray-900 p-4 rounded shadow-inner">
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
            
            <div className="bg-gradient-to-r from-accent-50 to-gray-50 dark:from-accent-900/20 dark:to-gray-800/50 p-6 rounded-lg my-6">
              <h4 className="text-xl font-bold text-accent-700 dark:text-accent-300 mb-3">Mathematical Foundation</h4>
              <p className="text-gray-800 dark:text-gray-200">
                The visualization employs non-linear dimensionality reduction techniques to preserve the local structure of high-dimensional data when mapping to lower dimensions. This is accomplished through a combination of:
              </p>
              <ul className="mt-3 space-y-1">
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2"></span>
                  Stochastic neighbor embedding
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2"></span>
                  Force-directed graph layout algorithms
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2"></span>
                  Kernel density estimation for continuous distributions
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg mt-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">References</h4>
              <ul className="text-sm space-y-2">
                <li className="text-gray-700 dark:text-gray-300">Smith, J. et al. (2024). "Advances in Interactive Data Visualization." <em>Journal of Visual Analytics</em>, 45(2), 112-128.</li>
                <li className="text-gray-700 dark:text-gray-300">Brown, A. (2023). "Perceptual Optimization in Information Displays." <em>IEEE Transactions on Visualization</em>, 18(3), 89-103.</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button onClick={() => setShowTheory(false)} className="px-6">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Video Preview Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{project.title} - Video Preview</DialogTitle>
            <DialogDescription>
              Watch a demonstration of the project in action
            </DialogDescription>
          </DialogHeader>
          
          <div className="aspect-video bg-black rounded-md overflow-hidden">
            {project.dirName && (() => {
              const videoData = getProjectVideo(project.dirName);
              if (videoData) {
                return (
                  <iframe 
                    className="w-full h-full"
                    src={videoData.embedUrl} 
                    title={`${project.title} Demo`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                );
              } else {
                return (
                  <div className="flex items-center justify-center h-full text-white">
                    <PlayCircle size={48} className="opacity-50" />
                    <p className="ml-2">Video preview not available</p>
                  </div>
                );
              }
            })()}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideoModal(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                View Live Demo
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
