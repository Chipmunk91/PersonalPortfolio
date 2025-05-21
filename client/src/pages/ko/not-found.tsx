import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseNotFound from "@/pages/not-found";

export default function KoreanNotFound() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return <BaseNotFound />;
}