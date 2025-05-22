import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { HomeIcon, ArrowLeft } from 'lucide-react';

export default function KoreanNotFound() {
  const { i18n, t } = useTranslation();
  const [, setLocation] = useLocation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  // Function to handle going back
  const handleGoBack = () => {
    // Simply navigate to the blog list - more reliable than history.back()
    setLocation('/ko/blog');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title', '페이지를 찾을 수 없습니다')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('notFound.message', "죄송합니다. 요청하신 페이지를 찾을 수 없습니다.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/ko">
                <HomeIcon className="w-4 h-4 mr-2" />
                {t('notFound.goHome', '홈으로')}
              </Link>
            </Button>
            <Button 
              onClick={handleGoBack}
              className="cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('notFound.goBack', '돌아가기')}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}