import { useEffect, useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { blogPosts, getBlogPostContent, parseFrontMatter } from '@/lib/blogLoader';
import { BlogPostType } from '@/lib/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Share2,
  Twitter,
  Facebook,
  Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function MarkdownBlog() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ id: string }>('/blog/:id');

  // Blog post view states
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [content, setContent] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  // Blog listing states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAllPosts, setShowAllPosts] = useState(false);
  const postsPerPage = 6;

  useEffect(() => {
    if (params && params.id) {
      const id = parseInt(params.id);
      const foundPost = blogPosts.find(p => p.id === id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get post content
        const content = getBlogPostContent(id);
        setContent(content);
        
        // Get related posts (same category, excluding current post)
        const related = blogPosts
          .filter(p => p.id !== id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [params]);

  // If viewing a specific blog post
  if (params && params.id) {
    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
              <p className="mt-4 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => setLocation('/blog')}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => setLocation('/blog')}
              className="group flex items-center text-sm font-medium"
            >
              <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Button>
          </motion.div>
          
          {/* Blog Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime} min read
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                <span className="capitalize">{post.category}</span>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          {/* Blog Post Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-10 mb-8"
          >
            <MarkdownRenderer markdown={content} />
          </motion.div>
          
          {/* Share Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Share this post:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div 
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setLocation(`/blog/${relatedPost.id}`);
                    }}
                    className="block cursor-pointer"
                  >
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Blog listing view
  // Get categories for filter buttons
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = showAllPosts 
    ? filteredPosts 
    : filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Render blog listing
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog & Insights</h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughts, tutorials, and deep dives into data visualization, AI interpretability, and interactive tools.
        </p>
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
                setShowAllPosts(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => {
                window.scrollTo(0, 0);
                setLocation(`/blog/${post.id}`);
              }}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                  <span className="text-gray-500 dark:text-gray-400">{post.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination or See More Posts Button */}
        <div className="flex justify-center mt-12">
          {!showAllPosts ? (
            <div className="flex flex-col items-center space-y-4">
              {totalPages > 1 && (
                <div className="flex space-x-2 mb-4">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === index + 1
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
              {filteredPosts.length > postsPerPage && (
                <button 
                  onClick={() => setShowAllPosts(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-600 transition-colors"
                >
                  See all posts
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <button 
              onClick={() => setShowAllPosts(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Show less
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Subscribe to my newsletter
                </h3>
                <p className="text-primary-100 mb-6">
                  Get the latest articles, tutorials, and resources on AI
                  visualization and interpretability delivered straight to your
                  inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white h-12"
                  />
                  <button
                    className="px-6 py-3 
                    border border-primary-600
                    bg-white 
                    text-primary-600 
                    dark:bg-gray-800 
                    dark:text-white 
                    font-medium rounded-lg 
                    hover:bg-gray-100 
                    dark:hover:bg-gray-700 
                    transition-colors h-12 
                    dark:border-gray-700"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-primary-200 mt-3">
                  I respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="md:w-1/2 md:pl-12 flex justify-center">
                <div className="animate-bounce">
                  <svg className="h-24 w-24 text-white opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}