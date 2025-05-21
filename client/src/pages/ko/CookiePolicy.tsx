import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseCookiePolicy from "@/pages/CookiePolicy";

export default function KoreanCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  React.useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return <BaseCookiePolicy />;
}