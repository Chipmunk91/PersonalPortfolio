import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPostType } from '@/lib/types';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogCardProps {
  post: BlogPostType;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const [currentLocation, setLocation] = useLocation();
  const { t } = useTranslation('blog');
  const { language } = useLanguage();
  
  // Handle navigation to blog post
  const navigateToBlogPost = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use the post's specific language if available, otherwise use current UI language
    const targetLanguage = post.language || language;
    setLocation(`/${targetLanguage}/blog/${post.id}`);
  };

  return (
    <motion.div 
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.1 * (index % 3) }}
      whileHover={{ y: -5, transition: { duration: 0.2 }, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      onClick={navigateToBlogPost}
      className="cursor-pointer bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden"
    >
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 bg-primary font-medium text-white text-xs rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-4">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{t('readTime', { time: post.readTime })}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 dark:text-white">{post.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </span>
          <span className="text-primary font-medium text-sm inline-flex items-center">
            {t('readMore')}
            <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
}