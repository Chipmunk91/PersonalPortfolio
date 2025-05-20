import { BlogPostType } from '@/lib/types';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

interface BlogPostCardProps {
  post: BlogPostType;
  index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  const [_, setLocation] = useLocation();
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorial': 
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'insight': 
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'case-study': 
        return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      default: 
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const navigateToBlogPost = () => {
    window.scrollTo(0, 0);
    setLocation(`/blog/${post.id}`);
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={navigateToBlogPost}
    >
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
            {post.readTime} min read
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{post.author}</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-500">{post.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
