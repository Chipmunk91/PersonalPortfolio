import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogFilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  setCurrentPage: (page: number) => void;
}

export function BlogFilterSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  setCurrentPage
}: BlogFilterSectionProps) {
  const { language } = useLanguage();
  
  // Translations for category labels
  const categoryTranslations: Record<string, Record<string, string>> = {
    'all': {
      'en': 'All Categories',
      'ko': '모든 카테고리',
      'ja': 'すべてのカテゴリ'
    },
    'tutorial': {
      'en': 'Tutorial',
      'ko': '튜토리얼',
      'ja': 'チュートリアル'
    }
    // Add more category translations as needed
  };
  return (
    <div className="mb-12">
      {/* Search Bar */}
      <div className="mb-6 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      {/* Category Filter Buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category === 'all' 
              ? (categoryTranslations['all'][language] || 'All Categories')
              : (categoryTranslations[category]?.[language] || category)}
          </button>
        ))}
      </motion.div>
    </div>
  );
}