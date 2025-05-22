import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { HomeIcon, ArrowLeft } from 'lucide-react';

export default function JapaneseNotFound() {
  const { i18n, t } = useTranslation();
  const [, setLocation] = useLocation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  // Function to handle going back
  const handleGoBack = () => {
    // Check if we can extract a section from the current URL
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    
    // If we have at least a language and section (like /ja/blog/123)
    if (segments.length >= 3) {
      // Go back to the section's main page (like /ja/blog or /ja/projects)
      setLocation(`/ja/${segments[2]}`);
    } else {
      // Default fallback to home
      setLocation('/ja');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title', 'ページが見つかりません')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('notFound.message', "申し訳ありませんが、お探しのページが見つかりませんでした。")}
          </p>
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/ja">
                <HomeIcon className="w-4 h-4 mr-2" />
                {t('notFound.goHome', 'ホームへ')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}