import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import { projects, getProjectPaper, getProjectPlayground, getProjectVideo } from '@/lib/projectLoader';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { ProjectFilterSection } from './ProjectFilterSection';
import { ProjectCarousel } from './ProjectCarousel';

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [playgroundConfig, setPlaygroundConfig] = useState<Record<string, any>>({});
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
        <ProjectFilterSection
          filter={filter}
          setFilter={setFilter}
          categories={allCategories}
          setCurrentPage={setCurrentPage}
        />
        
        {/* Project Carousel */}
        <ProjectCarousel
          projects={filteredProjects}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          projectsPerPage={projectsPerPage}
          handleProjectSelect={handleProjectSelect}
        />
        
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
                          onChange={(values: Record<string, any>) => setPlaygroundConfig(values)}
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
      </div>
    </section>
  );
}