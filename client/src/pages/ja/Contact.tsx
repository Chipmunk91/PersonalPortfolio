import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseContact from "@/pages/Contact";

export default function JapaneseContact() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return <BaseContact />;
}