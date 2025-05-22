import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectType } from '@/lib/types';
import { getProjectPlayground } from '@/lib/projectLoader';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectPlaygroundProps {
  selectedProject: ProjectType | null;
  playgroundConfig: Record<string, any>;
  onConfigChange: (values: Record<string, any>) => void;
}

export function ProjectPlayground({
  selectedProject,
  playgroundConfig,
  onConfigChange
}: ProjectPlaygroundProps) {
  // Get the current language for loading localized content
  const { language } = useLanguage();
  
  return (
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
        
        {selectedProject && selectedProject.dirName ? (
          /* Dynamically load the playground component for the selected project */
          (() => {
            // Get the language-specific playground component using the current language
            const playground = getProjectPlayground(selectedProject.dirName, language);
            if (playground && playground.default) {
              const PlaygroundComponent = playground.default;
              return (
                <PlaygroundComponent
                  onChange={onConfigChange}
                  {...playgroundConfig}
                />
              );
            } else {
              return (
                <div className="flex justify-center items-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
                    <p>No playground available for this project</p>
                  </div>
                </div>
              );
            }
          })()
        ) : (
          <div className="flex justify-center items-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
              <p>Select a project to view its interactive playground</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}