import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PolicyContent, fetchPolicyPage } from '@/lib/cms';
import { Language } from '@/contexts/LanguageContext';

interface PolicyPageProps {
  policyType: 'privacy-policy' | 'cookie-policy' | 'terms-of-service';
  lang: Language;
}

export function PolicyPage({ policyType, lang }: PolicyPageProps) {
  const { i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const [policyContent, setPolicyContent] = useState<PolicyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure we're using the correct language
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  // Fetch the policy content
  useEffect(() => {
    async function loadPolicyContent() {
      setIsLoading(true);
      setError(null);
      
      try {
        const content = await fetchPolicyPage(policyType, lang);
        if (content) {
          setPolicyContent(content);
        } else {
          setError(`Could not find content for ${policyType} in ${lang}`);
        }
      } catch (err) {
        console.error('Error loading policy content:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPolicyContent();
  }, [policyType, lang]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 mb-4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !policyContent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Content Not Available
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {error || 'The requested policy could not be found.'}
            </p>
            <button 
              onClick={() => setLocation(`/${lang}`)}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Return to Homepage
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {policyContent.title}
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {policyContent.lastUpdated ? `${lang === 'en' ? 'Last updated' : lang === 'ja' ? '最終更新日' : '마지막 업데이트'}: ${policyContent.lastUpdated}` : ''}
            </p>

            {/* Introduction */}
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {policyContent.content.introduction}
            </p>

            {/* Sections */}
            {policyContent.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  {section.body}
                </p>

                {/* Subsections, if any */}
                {section.subsections && section.subsections.length > 0 && (
                  <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                    {section.subsections.map((subsection, subIndex) => (
                      <li key={subIndex} className="mb-2">
                        {subsection.title && (
                          <strong>{subsection.title}:</strong>
                        )} 
                        {subsection.body}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}