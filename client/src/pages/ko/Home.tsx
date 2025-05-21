import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseHome from "@/pages/Home";

export default function KoreanHome() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return <BaseHome />;
}