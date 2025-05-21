import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseProjects from "@/pages/Projects";

export default function JapaneseProjects() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return <BaseProjects />;
}