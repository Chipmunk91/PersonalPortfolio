import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseAbout from "@/pages/About";

export default function EnglishAbout() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return <BaseAbout />;
}