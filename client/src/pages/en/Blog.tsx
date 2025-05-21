import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getBlogPostsByLanguage, getBlogPostContent, getBlogPostById } from '@/lib/blogLoader';
import { BlogPostType } from '@/lib/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { BlogCard } from '@/components/BlogCard';
import { BlogFilterSection } from '@/components/BlogFilterSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function EnglishBlog() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute<{ id: string }>('/en/blog/:id');
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  // Blog post view states
  const [post, setPost] = useState<BlogPostType | undefined>(undefined);
  const [content, setContent] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  // Blog listing states
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 6;

  // State for language-specific blog posts
  const [languagePosts, setLanguagePosts] = useState<BlogPostType[]>([]);
  
  // Load language-specific posts
  useEffect(() => {
    setLanguagePosts(getBlogPostsByLanguage('en'));
  }, []);
  
  // One-time effect for initial route
  useEffect(() => {
    if (params && params.id) {
      const id = parseInt(params.id);
      const foundPost = getBlogPostById(id, 'en');
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get post content
        const postContent = getBlogPostContent(id, 'en');
        setContent(postContent);
        
        // Get related posts (same category, excluding current post)
        const related = languagePosts
          .filter(p => p.id !== id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
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
              <Button onClick={() => setLocation('/en/blog')}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
          {/* Back Button */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => setLocation('/en/blog')}
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
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 md:p-10 mb-8"
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
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200"
                  onClick={() => {
                    const url = window.location.href;
                    const text = `Check out this post: ${post.title}`;
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                  }}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  onClick={() => {
                    const url = window.location.href;
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                  }}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  onClick={() => {
                    const url = window.location.href;
                    const title = post.title;
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                  }}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                  onClick={() => {
                    const url = window.location.href;
                    const body = `Check out this post: ${post.title}\n${url}`;
                    window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(body)}`, '_blank');
                  }}
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => {
                    // Copy link to clipboard
                    navigator.clipboard.writeText(window.location.href)
                      .then(() => {
                        alert('Link copied to clipboard!');
                      })
                      .catch(err => {
                        console.error('Failed to copy link: ', err);
                      });
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setLocation(`/en/blog/${relatedPost.id}`);
                    }}
                  >
                    <div className="cursor-pointer">
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
            </div>
          )}
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Blog listing view
  // Get categories for filter buttons
  const categories = ["all", ...Array.from(new Set(languagePosts.map(post => post.category)))];
  
  // Filter posts by category and search query
  const filteredPosts = languagePosts
    .filter(post => selectedCategory === "all" || post.category === selectedCategory)
    .filter(post => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    });
  
  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Render blog listing
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Blog & Insights</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Thoughts, tutorials, and deep dives into data visualization, AI interpretability, and interactive tools.
            </p>
          </motion.div>
        
          {/* Search and Filter Bar */}
          {/* Blog Filter Section */}
          <BlogFilterSection 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            setCurrentPage={setCurrentPage}
          />
          
          {/* Blog Post Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Newsletter Section */}
          <NewsletterSection 
            title="Subscribe to my newsletter"
            description="Get the latest articles, tutorials, and resources on AI visualization and interpretability delivered straight to your inbox."
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}