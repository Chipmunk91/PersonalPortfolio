import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseCookiePolicy from "@/pages/CookiePolicy";

export default function EnglishCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  React.useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return <BaseCookiePolicy />;
}