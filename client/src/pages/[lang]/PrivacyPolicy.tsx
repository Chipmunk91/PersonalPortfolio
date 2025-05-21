import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { fetchPage, PageContent } from '@/lib/cms';

export default function PrivacyPolicyPage() {
  const { lang } = useParams();
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
        const content = await fetchPage('privacy-policy', lang);
        setPageContent(content);
      } catch (error) {
        console.error('Failed to load privacy policy content:', error);
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
              Sorry, the privacy policy content is not available in this language.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            {pageContent.title}
          </h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: pageContent.body }}
            />
            
            {pageContent.metadata?.lastUpdated && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {pageContent.metadata.lastUpdated}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}