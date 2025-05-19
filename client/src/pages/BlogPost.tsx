import { useEffect, useState, lazy, Suspense } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/content/blog-posts';
import { BlogPostType } from '@/lib/types';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const [_, params] = useRoute('/blog/:id');
  const [__, setLocation] = useLocation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  
  useEffect(() => {
    if (params && params.id) {
      const foundPost = blogPosts.find(p => p.id === parseInt(params.id, 10));
      setPost(foundPost || null);
      // Scroll to top when changing blog posts
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [params]);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to all posts</span>
            </Button>
          </motion.div>
          
          {/* Blog Post Hero */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-80 object-cover rounded-xl shadow-lg mb-8" 
            />
            
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(post.category)}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
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
              <Suspense fallback={<div className="text-center py-8">Loading article content...</div>}>
                {/* Load the appropriate blog post content */}
                {post.id === 1 ? (
                  <Post1 />
                ) : post.id === 2 ? (
                  <Post2 />
                ) : post.id === 3 ? (
                  <Post3 />
                ) : (
                  // Default content for posts that don't have a specific component yet
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="lead text-xl">
                      {post.excerpt}
                    </p>
                    
                    <h2>Introduction</h2>
                    <p>
                      This is a placeholder for blog post #{post.id}: "{post.title}".
                    </p>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-6">
                      <h3 className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">How to add content for this post</h3>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        To create content for this blog post:
                      </p>
                      <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300">
                        <li>Create a new file in <code>client/src/content/blog-posts/</code> with format <code>XX-your-post-title.tsx</code></li>
                        <li>Include both metadata and content in that file (see existing posts as examples)</li>
                        <li>Import and register it in <code>client/src/content/blog-posts/index.ts</code></li>
                        <li>Add it to the conditional rendering in <code>BlogPost.tsx</code></li>
                      </ol>
                    </div>
                    
                    <h2>Sample Content Structure</h2>
                    <p>
                      Your blog post content should include sections like:
                    </p>
                    
                    <ul>
                      <li>Introduction - Explain what the article is about</li>
                      <li>Main sections - Divide content into logical sections</li>
                      <li>Code examples or visual elements where relevant</li>
                      <li>Conclusion - Summarize key points</li>
                    </ul>
                  </div>
                )}
              </Suspense>
            </motion.div>
          </div>
          
          {/* Share Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 3)
                .map((relatedPost, index) => (
                  <div 
                    key={relatedPost.id} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
                    onClick={() => {
                      setLocation(`/blog/${relatedPost.id}`);
                    }}
                  >
                    <img 
                      src={relatedPost.imageUrl} 
                      alt={relatedPost.title} 
                      className="w-full h-40 object-cover" 
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400">
                        {relatedPost.title}
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{relatedPost.author}</span>
                        <span className="text-gray-500 dark:text-gray-500">{relatedPost.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}