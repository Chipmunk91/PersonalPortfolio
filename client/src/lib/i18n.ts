import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import language resources directly
import enCommon from '../locales/en/common.json';
import enBlog from '../locales/en/blog.json';
import enProjects from '../locales/en/projects.json';
import enContact from '../locales/en/contact.json';
import enAbout from '../locales/en/about.json';
import enNewsletter from '../locales/en/newsletter.json';

import jaCommon from '../locales/ja/common.json';
import jaBlog from '../locales/ja/blog.json';
import jaProjects from '../locales/ja/projects.json';
import jaContact from '../locales/ja/contact.json';
import jaAbout from '../locales/ja/about.json';
import jaNewsletter from '../locales/ja/newsletter.json';

import koCommon from '../locales/ko/common.json';
import koBlog from '../locales/ko/blog.json';
import koProjects from '../locales/ko/projects.json';
import koContact from '../locales/ko/contact.json';
import koAbout from '../locales/ko/about.json';
import koNewsletter from '../locales/ko/newsletter.json';

// Define supported languages
export const supportedLanguages = ['en', 'ja', 'ko'];

// Define language options with display names and flags
export const languageOptions = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize the configuration
  .init({
    // Bundle resources by namespace
    resources: {
      en: {
        common: enCommon,
        blog: enBlog,
        projects: enProjects,
        contact: enContact,
        about: enAbout,
        newsletter: enNewsletter
      },
      ja: {
        common: jaCommon,
        blog: jaBlog,
        projects: jaProjects,
        contact: jaContact,
        about: jaAbout,
        newsletter: jaNewsletter
      },
      ko: {
        common: koCommon,
        blog: koBlog,
        projects: koProjects,
        contact: koContact,
        about: koAbout,
        newsletter: koNewsletter
      }
    },
    fallbackLng: 'en',
    debug: false,
    
    // Common namespaces across all pages
    ns: ['common', 'blog', 'projects', 'contact', 'about', 'newsletter'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    
    // Detect language from browser and persist in localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  });

export default i18n;