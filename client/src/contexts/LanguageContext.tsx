import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

// Define available languages and their codes
export type Language = 'en' | 'ko' | 'ja';

export type LanguageOption = {
  code: Language;
  name: string;
  flag: string;
  hreflang: string;
  region: string;
};

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', hreflang: 'en', region: 'United States' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', hreflang: 'ko', region: 'Korea' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', hreflang: 'ja', region: 'Japan' },
];

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languages: LanguageOption[];
  getLanguageURL: (path: string) => string;
  currentLanguageOption: LanguageOption;
};

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  languages,
  getLanguageURL: () => '',
  currentLanguageOption: languages[0],
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const { i18n } = useTranslation();
  const [location] = useLocation();

  // Custom setter that also changes i18n language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Auto-detect user language based on browser settings or geolocation
  useEffect(() => {
    const detectUserLanguage = async () => {
      try {
        // First try to detect from browser language
        const browserLang = navigator.language.split('-')[0] as Language;
        
        // Check if browser language is supported
        if (['en', 'ko', 'ja'].includes(browserLang)) {
          setLanguage(browserLang);
          localStorage.setItem('preferredLanguage', browserLang);
          return;
        }

        // Try to get user location using a free geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Set language based on country code
        if (data.country_code === 'KR') {
          setLanguage('ko');
        } else if (data.country_code === 'JP') {
          setLanguage('ja');
        } else {
          // Default to English for other locations
          setLanguage('en');
        }
        
        // Save to localStorage for future visits
        localStorage.setItem('preferredLanguage', language);
      } catch (error) {
        // If detection fails, check localStorage or default to English
        const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
        if (savedLanguage && ['en', 'ko', 'ja'].includes(savedLanguage)) {
          setLanguage(savedLanguage);
        } else {
          setLanguage('en');
        }
      }
    };

    // Check if user has already set a language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (savedLanguage && ['en', 'ko', 'ja'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      detectUserLanguage();
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    
    // Update html lang attribute for accessibility
    document.documentElement.lang = language;
    
    // Add hreflang tags for SEO
    addHreflangTags();
  }, [language]);

  // Get current language option
  const currentLanguageOption = languages.find(lang => lang.code === language) || languages[0];
  
  // Helper to add hreflang tags for SEO
  const addHreflangTags = () => {
    // Remove existing hreflang tags
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Get base URL
    const baseUrl = window.location.origin;
    const path = location;
    
    // Add hreflang tags for each language
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.hreflang;
      link.href = `${baseUrl}${path}`;
      document.head.appendChild(link);
    });
    
    // Add x-default hreflang
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${baseUrl}${path}`;
    document.head.appendChild(defaultLink);
  };

  // Helper function to get language-aware URLs
  const getLanguageURL = (path: string) => {
    // Just return the path as is - we'll handle language at the component level
    return path;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        languages, 
        getLanguageURL,
        currentLanguageOption
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}