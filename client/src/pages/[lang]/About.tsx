import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { fetchPage, PageContent } from '@/lib/cms';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SkillTag } from '@/components/SkillTag';
import { skills } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import { TimelineItem } from '@/components/TimelineItem';

interface TimelineItemType {
  year: string;
  title: string;
  company: string;
}

export default function AboutPage() {
  const { lang } = useParams();
  const [, setLocation] = useLocation();
  const { i18n } = useTranslation();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Ensure we're using the correct language
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  // Fetch the page content from our CMS API
  useEffect(() => {
    async function loadContent() {
      if (!lang) return;
      
      setLoading(true);
      try {
        const content = await fetchPage('about', lang);
        setPageContent(content);
      } catch (error) {
        console.error('Failed to load about content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [lang]);

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
              Sorry, the about page content is not available in this language.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Extract timeline data from metadata
  const timeline: TimelineItemType[] = pageContent.metadata?.timeline || [];
  
  // Get skills appropriate for the current language
  const displaySkills = skills.slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {/* Profile Image */}
            <motion.div 
              className="w-full md:w-1/3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700">
                <img
                  src={pageContent.metadata?.profileImage || "/images/profile.jpg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* About Content */}
            <motion.div 
              className="w-full md:w-2/3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {pageContent.title}
              </h1>
              
              <div 
                className="prose dark:prose-invert max-w-none mb-6"
                dangerouslySetInnerHTML={{ 
                  __html: pageContent.body.match(/<div class="about-intro">.*?<\/div>/s)?.[0] || ''
                }}
              />
              
              <div className="flex flex-wrap gap-3 mt-6">
                {displaySkills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    name={skill.name}
                    category={skill.category}
                    delay={index * 0.05}
                  />
                ))}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setLocation(`/${lang}/projects`)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  View My Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setLocation(`/${lang}/contact`)}
                  className="border border-primary text-primary hover:bg-primary/10"
                >
                  Contact Me
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Expertise Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: pageContent.body.match(/<div class="about-expertise">.*?<\/div>/s)?.[0] || ''
              }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {lang === 'en' ? 'Experience' : (lang === 'ja' ? '経歴' : '경력')}
            </motion.h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 md:left-1/2 transform md:-translate-x-0.5 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <TimelineItem
                    key={index}
                    title={item.title}
                    period={item.year}
                    description={item.company}
                    isLast={index === timeline.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Background Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: pageContent.body.match(/<div class="about-background">.*?<\/div>/s)?.[0] || ''
              }}
            />
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {lang === 'en' ? 'Want to work together?' : (lang === 'ja' ? '一緒に仕事をしませんか？' : '함께 일해 보시겠어요?')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {lang === 'en' ? "I'm currently available for freelance projects and consulting work." : 
             (lang === 'ja' ? 'フリーランスプロジェクトやコンサルティング業務に現在対応可能です。' : 
              '현재 프리랜서 프로젝트 및 컨설팅 작업이 가능합니다.')}
          </p>
          <Button
            variant="outline"
            className="px-6 py-3 border border-primary-600 text-primary-600 dark:bg-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-12 dark:border-gray-700"
            onClick={() => setLocation(`/${lang}/contact`)}
          >
            {lang === 'en' ? 'Get in touch' : (lang === 'ja' ? 'お問い合わせ' : '연락하기')}
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}