import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectType } from '@/lib/types';

interface ProjectCarouselProps {
  projects: ProjectType[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  projectsPerPage: number;
  handleProjectSelect: (project: ProjectType) => void;
  handleVideoPreview: (project: ProjectType) => void;
}

export function ProjectCarousel({
  projects,
  currentPage,
  setCurrentPage,
  projectsPerPage,
  handleProjectSelect,
  handleVideoPreview
}: ProjectCarouselProps) {
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Navigate to the previous page of projects
  const goToPrevPage = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : totalPages - 1);
  };
  
  // Navigate to the next page of projects
  const goToNextPage = () => {
    setCurrentPage(currentPage < totalPages - 1 ? currentPage + 1 : 0);
  };
  
  // Get the current page of projects to display
  const paginatedProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  return (
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
  );
}