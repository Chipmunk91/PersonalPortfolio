import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseHome from "@/pages/Home";

export default function JapaneseHome() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return <BaseHome />;
}