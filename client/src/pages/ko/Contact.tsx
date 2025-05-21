import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseContact from "@/pages/Contact";

export default function KoreanContact() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return <BaseContact />;
}