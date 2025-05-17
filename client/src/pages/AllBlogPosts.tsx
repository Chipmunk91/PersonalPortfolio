import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogPostCard } from '@/components/BlogPostCard';
import { blogPosts } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AllBlogPosts() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = blogPosts.filter(post => {
    // Category filter
    const passesCategory = activeFilter === 'all' || post.category === activeFilter;
    
    // Search filter
    const passesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    return passesCategory && passesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">All Blog Posts</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Browse all articles, tutorials, case studies, and insights about data visualization, AI interpretability, and interactive tools.
            </p>
          </motion.div>
          
          {/* Blog Filters */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter('all')}
              >
                All Posts
              </Button>
              <Button 
                variant={activeFilter === 'tutorial' ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter('tutorial')}
              >
                Tutorials
              </Button>
              <Button 
                variant={activeFilter === 'case-study' ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter('case-study')}
              >
                Case Studies
              </Button>
              <Button 
                variant={activeFilter === 'insight' ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveFilter('insight')}
              >
                Insights
              </Button>
            </div>
            
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogPostCard 
                key={post.id}
                post={post}
                index={index}
              />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't find any articles matching your search criteria.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}