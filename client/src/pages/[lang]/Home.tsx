import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { fetchPage, PageContent } from '@/lib/cms';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, PaintBucket } from 'lucide-react';
import { FaPython, FaReact, FaJs } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from '@/components/EmailCaptureModal';
import { BlogPostType } from '@/lib/types';
import { blogPosts } from '@/lib/blogLoader';
import { projects } from '@/lib/projectLoader';

export default function HomePage() {
  const { lang } = useParams();
  const [, setLocation] = useLocation();
  const { i18n } = useTranslation();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ensure we're using the correct language
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  // Exit intent detection
  const handleMouseLeave = (e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem("hasShownExitModal")) {
      setIsModalOpen(true);
      sessionStorage.setItem("hasShownExitModal", "true");
    }
  };

  // Add event listener on component mount and remove on unmount
  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Fetch the page content from our CMS API
  useEffect(() => {
    async function loadContent() {
      if (!lang) return;
      
      setLoading(true);
      try {
        const content = await fetchPage('home', lang);
        setPageContent(content);
      } catch (error) {
        console.error('Failed to load home content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [lang]);

  // Get featured projects and blog posts
  const featuredProjects = projects.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 2);
  const featuredSkills = pageContent?.metadata?.skills || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pageContent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Content Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, the home page content is not available in this language.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                {pageContent.title}
              </h1>
              <div 
                className="text-xl text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ 
                  __html: pageContent.body.match(/<p class="text-xl.*?<\/p>/s)?.[0] || '' 
                }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => setLocation(`/${lang}/projects`)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg"
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setLocation(`/${lang}/contact`)}
                className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg"
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {pageContent.body.match(/<h2.*?Specialized in.*?<\/h2>/s)?.[0].replace(/<[^>]+>/g, '') || 'Specialized in'}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {featuredSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="skill-tag px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-12 w-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-primary-500 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {(pageContent.body.match(/<h3>Interactive Visualizations<\/h3>/) && 'Interactive Visualizations') || 
                 (pageContent.body.match(/<h3>インタラクティブな可視化<\/h3>/) && 'インタラクティブな可視化') || 
                 (pageContent.body.match(/<h3>인터랙티브 시각화<\/h3>/) && '인터랙티브 시각화')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {pageContent.body.match(/<div class="feature-item">\s*<h3>.*?<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || ''}
              </p>
              <div className="flex space-x-2">
                <FaReact className="text-blue-500" />
                <FaJs className="text-yellow-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  D3.js, Three.js
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-12 w-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center text-accent-500 mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {(pageContent.body.match(/<h3>AI Model Interpretability<\/h3>/) && 'AI Model Interpretability') || 
                 (pageContent.body.match(/<h3>AIモデルの解釈可能性<\/h3>/) && 'AIモデルの解釈可能性') || 
                 (pageContent.body.match(/<h3>AI 모델 해석 가능성<\/h3>/) && 'AI 모델 해석 가능성')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)Interpretability(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || 
                 pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)解釈可能性(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || 
                 pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)해석 가능성(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || ''}
              </p>
              <div className="flex space-x-2">
                <FaPython className="text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  TensorFlow, PyTorch
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="h-12 w-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center text-secondary-500 mb-4">
                <PaintBucket className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {(pageContent.body.match(/<h3>UX\/UI Design<\/h3>/) && 'UX/UI Design') || 
                 (pageContent.body.match(/<h3>UX\/UIデザイン<\/h3>/) && 'UX/UIデザイン') || 
                 (pageContent.body.match(/<h3>UX\/UI 디자인<\/h3>/) && 'UX/UI 디자인')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)Design(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || 
                 pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)デザイン(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || 
                 pageContent.body.match(/<div class="feature-item">(?:.*?)<h3>(?:.*?)디자인(?:.*?)<\/h3>\s*<p>(.*?)<\/p>/s)?.[1] || ''}
              </p>
              <div className="flex space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Figma, Framer, Motion Design
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="group" onClick={() => setLocation(`/${lang}/about`)}>
              <span>Learn more about my expertise</span>
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Some of my recent work
              </p>
            </div>
            <Button variant="link" className="text-primary-500" onClick={() => setLocation(`/${lang}/projects`)}>
              <span>View all projects</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Latest Insights
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Thoughts and tutorials on AI visualization
              </p>
            </div>
            <Button variant="link" className="text-primary-500" onClick={() => setLocation(`/${lang}/blog`)}>
              <span>Read all articles</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded-full">
                        {post.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <Button variant="link" className="text-primary-500 p-0" onClick={() => setLocation(`/${lang}/blog/${post.id}`)}>
                      Read article
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {pageContent.body.match(/<div class="cta-section">\s*<h2>(.*?)<\/h2>/s)?.[1] || 'Ready to transform your data into intuitive visuals?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {pageContent.body.match(/<div class="cta-section">(?:.*?)<h2>(?:.*?)<\/h2>\s*<p>(.*?)<\/p>/s)?.[1] || 
             'Let\'s collaborate on your next project and create powerful, interactive visualizations that drive insights.'}
          </p>
          <Button
            variant="outline"
            className="px-6 py-3 border border-primary-600 text-primary-600 dark:bg-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-12 dark:border-gray-700"
            onClick={() => setLocation(`/${lang}/contact`)}
          >
            Get in touch
          </Button>
        </div>
      </section>

      <Footer />
      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}