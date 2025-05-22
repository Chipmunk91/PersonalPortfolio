import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContactSection } from '@/components/ContactSection';

export default function KoreanContact() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-20 pt-28 bg-gray-50 dark:bg-gray-800">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}