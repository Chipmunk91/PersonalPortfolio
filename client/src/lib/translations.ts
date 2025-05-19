import { Language } from "@/contexts/LanguageContext";

// Import JSON locale files (in a real TMS setup, these would be loaded dynamically)
import enLocale from '@/locales/en.json';
import koLocale from '@/locales/ko.json';
import jaLocale from '@/locales/ja.json';

/**
 * This file implements the Single Codebase + Resource Files approach for internationalization.
 * It's designed to integrate with Translation Management Systems (TMS) like Lokalise, Phrase, or Crowdin.
 * 
 * Key features of this i18n implementation:
 * 
 * 1. Key-based strings - Every piece of text in the UI is replaced by a lookup key (e.g. 'nav.home')
 * 2. Locale bundles - For each supported language we maintain a separate JSON resource file
 * 3. Namespaced keys - Keys are organized into namespaces (nav, hero, etc.) for better organization
 * 4. Fallback mechanism - Missing translations fall back to English rather than showing empty content
 * 5. Runtime loading - Translations are loaded at runtime based on user language preference
 * 
 * In a production environment, this would integrate with a TMS workflow:
 * - Export keys to TMS when new content is added
 * - Professional translators provide translations through TMS interface
 * - Translated JSON files are pulled back into codebase or delivered via CDN
 */

// Define all possible translation keys with dot notation for namespaces
export type TranslationKey = 
  // Navigation
  | 'nav.home'
  | 'nav.about'
  | 'nav.projects'
  | 'nav.blog'
  | 'nav.contact'
  
  // Hero Section
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.button'
  
  // Skills Section
  | 'skills.title'
  | 'skills.visualization.title'
  | 'skills.visualization.desc'
  | 'skills.ai.title'
  | 'skills.ai.desc'
  | 'skills.uxui.title'
  | 'skills.uxui.desc'
  | 'skills.button'
  
  // Projects Section
  | 'projects.title'
  | 'projects.subtitle'
  | 'projects.viewAll'
  
  // Blog Section
  | 'blog.title'
  | 'blog.subtitle'
  | 'blog.readAll'
  | 'blog.readArticle'
  
  // CTA Section
  | 'cta.title'
  | 'cta.subtitle'
  | 'cta.button'
  
  // Footer
  | 'footer.navigation'
  | 'footer.legal'
  | 'footer.rights'
  | 'footer.privacy'
  | 'footer.terms'
  | 'footer.cookies';

// Type for the translations structure
type TranslationsType = {
  [key in Language]: Record<string, any>;
};

// Load translations from JSON files
export const translations: TranslationsType = {
  en: enLocale,
  ko: koLocale,
  ja: jaLocale
};

/**
 * Helper function to get a translation by key for a specific language
 * Handles nested keys (e.g., 'nav.home') by traversing the object
 * Includes fallback to English if the translation is missing
 */
export function getTranslation(language: Language, key: TranslationKey): string {
  // Get locale object for requested language
  const locale = translations[language];
  
  // Split the key by dots to handle nested objects
  const keyParts = key.split('.');
  
  // Navigate through nested objects to find the translation
  // For example, 'nav.home' will look for locale.nav.home
  let value: any = locale;
  for (const part of keyParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      value = undefined;
      break;
    }
  }
  
  // If translation exists, return it
  if (value && typeof value === 'string') {
    return value;
  }
  
  // If translation doesn't exist in requested language, fall back to English
  console.warn(`Missing translation for key '${key}' in language '${language}'. Falling back to English.`);
  
  // Try to get from English
  value = translations['en'];
  for (const part of keyParts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      // If English translation is also missing, return the key itself
      console.error(`Translation key '${key}' missing in all languages!`);
      return key;
    }
  }
  
  return value;
}