import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';

export default function EnglishContact() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}