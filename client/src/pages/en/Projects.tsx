import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseProjects from "@/pages/Projects";

export default function EnglishProjects() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return <BaseProjects />;
}