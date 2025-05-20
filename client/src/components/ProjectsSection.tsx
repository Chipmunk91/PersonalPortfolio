import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { projects, getProjectPaper, getProjectPlayground, getProjectVideo } from '@/lib/projectLoader';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { Sliders, BarChart3, Layers, Github, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [playgroundConfig, setPlaygroundConfig] = useState<any>({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoProject, setCurrentVideoProject] = useState<ProjectType | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  
  // Extract all unique categories from projects
  const allCategories = Array.from(
    new Set(
      projects.flatMap(project => 
        project.categories.map(cat => cat.toLowerCase())
      )
    )
  );
  
  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.categories.some(cat => cat.toLowerCase() === filter.toLowerCase())
  );
  
  // Select the first project by default when component mounts
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, []);

  // When a project is selected, reset the playground configuration
  useEffect(() => {
    if (selectedProject) {
      // Reset playground config when a new project is selected
      setPlaygroundConfig({});
    }
  }, [selectedProject]);
  
  // Handle project selection for the playground
  const handleProjectSelect = (project: ProjectType) => {
    setSelectedProject(project);
    
    // Scroll to the playground section
    document.getElementById('playground-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
  
  // Handle video preview for a project
  const handleVideoPreview = (project: ProjectType) => {
    setCurrentVideoProject(project);
    setShowVideoModal(true);
  };
  
  // Calculate pagination for the carousel
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  // Navigate to the previous page of projects
  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  
  // Navigate to the next page of projects
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  
  // Get the current page of projects to display
  const paginatedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Interactive visualizations and tools that make complex AI systems more interpretable and accessible.
          </p>
        </motion.div>
        
        {/* Project Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => {
              setFilter('all');
              setCurrentPage(0); // Reset to first page when changing filter
            }}
          >
            All Projects
          </Button>
          
          {/* Generate filter buttons for each unique category */}
          {allCategories.map(category => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              className="rounded-full"
              onClick={() => {
                setFilter(category);
                setCurrentPage(0); // Reset to first page when changing filter
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </motion.div>
        
        {/* Project Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-10">
            <button 
              onClick={goToPrevPage}
              className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
          
          <div className="overflow-hidden">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              key={currentPage}
            >
              {paginatedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                  onSelect={handleProjectSelect}
                  onVideoPreview={handleVideoPreview}
                />
              ))}
              
              {/* Fill empty slots with blank spaces to maintain grid */}
              {paginatedProjects.length < projectsPerPage && 
                Array(projectsPerPage - paginatedProjects.length)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`empty-${i}`} className="invisible">
                      {/* Empty space */}
                    </div>
                  ))
              }
            </motion.div>
          </div>
          
          <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-10">
            <button 
              onClick={goToNextPage}
              className="h-10 w-10 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              aria-label="Next projects"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Page Indicators */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`mx-2 transition-all ${
                    currentPage === index
                      ? "h-4 w-12 bg-blue-500 shadow-lg shadow-blue-300 dark:shadow-blue-900/30"
                      : "h-4 w-4 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  } rounded-full`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Live Playground Section */}
        <motion.div 
          id="playground-section"
          className="mt-16 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedProject ? `${selectedProject.title} - Interactive Playground` : 'Interactive Playground'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedProject 
                ? `Experiment with this ${selectedProject.categories[0]} project by adjusting parameters to see how they affect the results in real-time.`
                : 'Click on any project above to try it out directly in your browser. Adjust parameters and see how they affect the output in real-time.'}
            </p>
            
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-6">
              {selectedProject && selectedProject.dirName ? (
                <div>
                  {/* Dynamically load the playground component for the selected project */}
                  {(() => {
                    const playground = getProjectPlayground(selectedProject.dirName);
                    if (playground && playground.default) {
                      const PlaygroundComponent = playground.default;
                      return (
                        <PlaygroundComponent
                          onChange={(values) => setPlaygroundConfig(values)}
                          {...playgroundConfig}
                        />
                      );
                    } else {
                      return (
                        <div className="flex justify-center items-center h-[300px] bg-white dark:bg-gray-700 rounded-lg">
                          <div className="text-center text-gray-500 dark:text-gray-400">
                            <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
                            <p>No playground available for this project</p>
                          </div>
                        </div>
                      );
                    }
                  })()}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[300px] bg-white dark:bg-gray-700 rounded-lg">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Select a project to view its interactive playground</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Video Preview Modal */}
        <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{currentVideoProject?.title} - Video Preview</DialogTitle>
              <DialogDescription>
                Watch a demonstration of the project in action
              </DialogDescription>
            </DialogHeader>
            
            {currentVideoProject && (
              <div className="aspect-video bg-black rounded-md overflow-hidden">
                {/* Video component or iframe would go here */}
                <div className="flex items-center justify-center h-full text-white">
                  <PlayCircle size={48} className="opacity-50" />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowVideoModal(false)}>
                Close
              </Button>
              {currentVideoProject && (
                <Button asChild>
                  <a href={currentVideoProject.demoUrl} target="_blank" rel="noopener noreferrer">
                    View Live Demo
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}