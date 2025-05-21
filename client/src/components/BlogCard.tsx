import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPostType } from '@/lib/types';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  post: BlogPostType;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const [_, setLocation] = useLocation();
  const { language } = useLanguage();
  
  // Get the translated content in the current language, or fallback to the default
  const title = post.translations[language]?.title || post.title;
  const excerpt = post.translations[language]?.excerpt || post.excerpt;
  const category = post.translations[language]?.category || post.category;
  const readTime = post.translations[language]?.readTime || post.readTime;
  const author = post.translations[language]?.author || post.author;
  
  // Localized read more text
  const readMoreText = {
    'en': 'Read Article',
    'ko': '자세히 보기',
    'ja': '記事を読む'
  }[language] || 'Read Article';

  return (
    <motion.div 
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 * (index % 3) }}
      whileHover={{ y: -5, transition: { duration: 0.2 }, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      onClick={() => {
        setLocation(`/blog/${post.id}`);
      }}
      className="cursor-pointer bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt={title} 
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 bg-primary font-medium text-white text-xs rounded-full">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{readTime} min read</span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <User className="h-4 w-4 mr-1" />
            {author}
          </span>
          <span className="text-primary font-medium text-sm inline-flex items-center">
            {readMoreText}
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}