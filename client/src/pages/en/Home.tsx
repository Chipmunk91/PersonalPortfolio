import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import BaseHome from "@/pages/Home";

export default function EnglishHome() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return <BaseHome />;
}