import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectFilterSection } from "@/components/ProjectFilterSection";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ProjectPlayground } from "@/components/ProjectPlayground";
import { projects } from '@/lib/projectLoader';
import { ProjectType } from '@/lib/types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function EnglishProjects() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [playgroundConfig, setPlaygroundConfig] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);
  
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
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
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
            
            {/* Project Playground */}
            <ProjectPlayground
              selectedProject={selectedProject}
              playgroundConfig={playgroundConfig}
              onConfigChange={setPlaygroundConfig}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}