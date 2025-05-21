import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('notFound.title', 'Page Not Found')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('notFound.message', "Sorry, we couldn't find the page you're looking for.")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href={`/${language}`}>
                <HomeIcon className="w-4 h-4 mr-2" />
                {t('notFound.goHome', 'Go Home')}
              </Link>
            </Button>
            <Button asChild>
              <a onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('notFound.goBack', 'Go Back')}
              </a>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}