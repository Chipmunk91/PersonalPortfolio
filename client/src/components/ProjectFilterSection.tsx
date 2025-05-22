import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectFilterSectionProps {
  filter: string;
  setFilter: (filter: string) => void;
  categories: string[];
  setCurrentPage: (page: number) => void;
}

export function ProjectFilterSection({
  filter,
  setFilter,
  categories,
  setCurrentPage,
}: ProjectFilterSectionProps) {
  const { language } = useLanguage();
  
  // Localized text for "All Projects" button
  const allProjectsText = {
    en: "All Projects",
    ja: "すべてのプロジェクト",
    ko: "모든 프로젝트"
  };
  
  return (
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
        {allProjectsText[language as keyof typeof allProjectsText]}
      </Button>
      
      {/* Generate filter buttons for each unique category */}
      {categories.map(category => (
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
  );
}