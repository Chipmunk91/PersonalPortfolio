import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseContact from "@/pages/Contact";

export default function EnglishContact() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return <BaseContact />;
}