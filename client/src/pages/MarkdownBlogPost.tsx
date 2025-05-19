import { useEffect, useState } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { getBlogPostById, loadBlogPostContent, getRelatedBlogPosts } from '@/lib/markdownBlog';
import { BlogPostType } from '@/lib/types';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin 
} from 'lucide-react';

export default function MarkdownBlogPost() {
  // Get the post ID from the URL
  const [, params] = useRoute<{ id: string }>('/blog/:id');
  const postId = params ? parseInt(params.id) : 0;
  
  const [, setLocation] = useLocation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);
  
  // Load post data and content
  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      
      if (postId) {
        // Get the blog post metadata
        const postData = getBlogPostById(postId);
        
        if (postData) {
          setPost(postData);
          
          // Load the content separately (markdown text)
          const markdown = await loadBlogPostContent(postId);
          if (markdown) {
            setContent(markdown);
          }
          
          // Find related posts in the same category
          const related = getRelatedBlogPosts(postId, 3);
          setRelatedPosts(related);
        } else {
          // Post not found, redirect to 404
          setLocation('/not-found');
        }
      }
      
      setLoading(false);
    }
    
    loadPost();
  }, [postId, setLocation]);
  
  // Handle page navigation
  const handleBackClick = () => {
    setLocation('/blog');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading blog post...</div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Blog post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <motion.button
          className="flex items-center text-gray-600 hover:text-primary mb-8 dark:text-gray-300 dark:hover:text-primary-400"
          onClick={handleBackClick}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="mr-2" size={20} />
          Back to Blog
        </motion.button>
        
        {/* Blog Header */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-10 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 items-center text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar size={18} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
            
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-6">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="absolute w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Blog Post Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-10 mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MarkdownRenderer markdown={content} />
          </motion.div>
        </div>
        
        {/* Share Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4 dark:text-white">Share this article</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors">
                <Share2 size={20} />
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <a className="block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title} 
                        className="absolute w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold uppercase text-primary">{relatedPost.category}</span>
                      <h3 className="font-bold text-xl mt-2 mb-2 dark:text-white">{relatedPost.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}