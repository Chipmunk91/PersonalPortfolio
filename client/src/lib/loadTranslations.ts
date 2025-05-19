/**
 * This utility module handles loading translations from locale files
 * For integration with a TMS (Translation Management System)
 */

import { Language } from '@/contexts/LanguageContext';

/**
 * In a production environment with a TMS, this function would:
 * 1. Dynamically load the appropriate locale file (based on user preference)
 * 2. Could fetch translations from a remote CDN rather than bundled JSON
 * 3. Could implement caching for performance
 * 4. In a Next.js/SSR environment, would load locales server-side
 */
export async function loadTranslations(language: Language): Promise<Record<string, any>> {
  try {
    // In a real application, this might use dynamic imports for code splitting
    // const translations = await import(`@/locales/${language}.json`);
    
    // For now, we'll use a simpler approach since our files are already imported in translations.ts
    let translations;
    switch (language) {
      case 'en':
        translations = (await import('@/locales/en.json')).default;
        break;
      case 'ko':
        translations = (await import('@/locales/ko.json')).default;
        break;
      case 'ja':
        translations = (await import('@/locales/ja.json')).default;
        break;
      default:
        translations = (await import('@/locales/en.json')).default;
    }
    
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    // Fallback to English if loading fails
    const fallback = (await import('@/locales/en.json')).default;
    return fallback;
  }
}

/**
 * Utility to detect user's preferred language
 * This could be enhanced with more sophisticated detection logic
 */
export function detectUserLanguage(): Language {
  // Check for language in localStorage (user's previous choice)
  const savedLanguage = localStorage.getItem('language') as Language | null;
  if (savedLanguage && ['en', 'ko', 'ja'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Browser language detection
  const browserLang = navigator.language.split('-')[0];
  
  // Map browser language to our supported languages
  if (browserLang === 'ko') return 'ko';
  if (browserLang === 'ja') return 'ja';
  
  // Default to English
  return 'en';
}

/**
 * Add hreflang tags to support SEO for multilingual content
 * This helps search engines understand language alternatives for the page
 */
export function addHreflangTags(baseUrl: string): void {
  // Remove any existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach(el => el.remove());
  
  // Add hreflang tags for each supported language
  const languages = ['en', 'ko', 'ja'];
  const head = document.querySelector('head');
  
  // Create a default hreflang (x-default) for search engines
  const defaultLink = document.createElement('link');
  defaultLink.rel = 'alternate';
  defaultLink.hreflang = 'x-default';
  defaultLink.href = baseUrl;
  head?.appendChild(defaultLink);
  
  // Create specific language alternates
  languages.forEach(lang => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = lang;
    link.href = `${baseUrl}${lang === 'en' ? '' : `?lang=${lang}`}`;
    head?.appendChild(link);
  });
}