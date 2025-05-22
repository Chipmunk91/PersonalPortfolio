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
    // Try to use history first
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to blog list if history isn't available
      setLocation('/ja/blog');
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/ja">
                <HomeIcon className="w-4 h-4 mr-2" />
                {t('notFound.goHome', 'ホームへ')}
              </Link>
            </Button>
            <Button 
              onClick={handleGoBack}
              className="cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('notFound.goBack', '戻る')}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}