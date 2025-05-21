import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseNotFound from "@/pages/not-found";

export default function JapaneseNotFound() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return <BaseNotFound />;
}