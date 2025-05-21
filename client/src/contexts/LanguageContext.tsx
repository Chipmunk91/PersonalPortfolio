import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages and their codes
export type Language = 'en' | 'ko' | 'ja';

export type LanguageOption = {
  code: Language;
  name: string;
  flag: string;
};

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  languages: LanguageOption[];
};

const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  languages,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

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
    // Also update html lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}