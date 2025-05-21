import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseCookiePolicy from "@/pages/CookiePolicy";

export default function JapaneseCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  React.useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return <BaseCookiePolicy />;
}