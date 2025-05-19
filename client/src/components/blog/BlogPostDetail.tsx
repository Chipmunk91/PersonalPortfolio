import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { blogPosts } from '@/lib/data';
import { BlogPostType } from '@/lib/types';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';

export function BlogPostDetail() {
  const [_, params] = useParams();
  const postId = params?.id ? parseInt(params.id) : undefined;
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Find the blog post by ID
    if (postId) {
      const foundPost = blogPosts.find(p => p.id === postId);
      setPost(foundPost || null);
      
      if (foundPost) {
        // Find related posts in the same category
        const related = blogPosts
          .filter(p => p.id !== postId && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    }
  }, [postId]);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Blog post not found</h2>
          <p className="mb-4">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <div className="mb-6">
            <Link href="/blog" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to blog</span>
            </Link>
          </div>
          
          {/* Blog Post Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-primary-900">
              <div className="h-80 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100 text-sm rounded-full">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
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
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 lg:p-8">
                {/* This is where you would add your custom blog post content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>
                    <strong>This is an example blog post template.</strong> For your actual portfolio, you would replace this with your real blog post content. You can structure your content with markdown-style formatting, including headings, paragraphs, lists, code blocks, images, and more.
                  </p>
                  
                  <h2>Introduction</h2>
                  
                  <p>
                    Start your article with a compelling introduction that explains what the article is about and why it matters to the reader. Hook them with an interesting fact, question, or statement that makes them want to keep reading.
                  </p>
                  
                  <p>
                    {post.excerpt}
                  </p>
                  
                  <h2>Main Section 1</h2>
                  
                  <p>
                    Dive into the details of your topic. Break down complex concepts into understandable pieces, provide examples, and explain your thinking clearly. Use subheadings to organize your content.
                  </p>
                  
                  <h3>Subsection 1.1</h3>
                  
                  <p>
                    Include specific examples, code snippets, or visualizations when relevant:
                  </p>
                  
                  <pre><code>
{`// Example code snippet
function createVisualization(data) {
  const svg = d3.select('#visualization')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    
  // Add visualization elements here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    // ... more D3.js code
}`}
                  </code></pre>
                  
                  <h3>Subsection 1.2</h3>
                  
                  <p>
                    Use bullet points or numbered lists to make information more digestible:
                  </p>
                  
                  <ul>
                    <li>Point one about visualization techniques</li>
                    <li>Point two about data preprocessing</li>
                    <li>Point three about user interaction design</li>
                  </ul>
                  
                  <h2>Main Section 2</h2>
                  
                  <p>
                    Continue with more in-depth content, perhaps showing a case study or practical application of the concepts you're discussing.
                  </p>
                  
                  <blockquote>
                    Include quotes or important takeaways in blockquotes to make them stand out. This helps readers who are scanning your article to catch the key points.
                  </blockquote>
                  
                  <h2>Conclusion</h2>
                  
                  <p>
                    Summarize the main points of your article and leave the reader with final thoughts or next steps. What should they do with this information? How can they apply what they've learned?
                  </p>
                  
                  <hr />
                  
                  <h3>Resources</h3>
                  
                  <p>
                    Provide links to additional resources, references, or tools mentioned in the article:
                  </p>
                  
                  <ul>
                    <li><a href="#">Resource 1</a></li>
                    <li><a href="#">Resource 2</a></li>
                    <li><a href="#">Resource 3</a></li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Author card */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  About the Author
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {/* Replace with actual author image */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {post.author}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Data Visualization Expert
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  A brief bio about the author would go here. Describe their expertise, background, and why they're qualified to write about this topic.
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="px-3 py-1 h-auto">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Related posts */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Related Articles
                </h3>
                
                <div className="space-y-4">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="flex items-center gap-3 group">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedPost.imageUrl} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {relatedPost.excerpt}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No related articles found.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {['tutorial', 'insight', 'case-study'].map(category => (
                    <Link key={category} href={`/blog?category=${category}`}>
                      <span className={`px-3 py-1 text-sm rounded-full cursor-pointer ${
                        category === post.category
                          ? 'bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-100'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}