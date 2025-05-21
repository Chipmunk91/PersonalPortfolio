import { useEffect } from 'react';
import { Route, Switch, useLocation, useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { type Language } from '@/contexts/LanguageContext';

// Page components
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookiePolicy from '@/pages/CookiePolicy';
import NotFound from '@/pages/not-found';

export function LanguageRouter() {
  const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [location, setLocation] = useLocation();

  // Helper function to extract path without language prefix
  const getPathWithoutLanguage = (path: string): string => {
    const pathParts = path.split('/');
    if (pathParts.length > 1 && ['en', 'ja', 'ko'].includes(pathParts[1])) {
      return '/' + pathParts.slice(2).join('/');
    }
    return path;
  };

  // Update language based on URL path when component mounts
  useEffect(() => {
    const pathParts = location.split('/');
    if (pathParts.length > 1) {
      const langFromUrl = pathParts[1] as Language;
      if (['en', 'ja', 'ko'].includes(langFromUrl)) {
        if (langFromUrl !== language) {
          setLanguage(langFromUrl);
          i18n.changeLanguage(langFromUrl);
        }
      } else if (location !== `/${language}${location}`) {
        // If no language in URL, redirect to URL with current language
        setLocation(`/${language}${location === '/' ? '' : location}`);
      }
    } else if (location === '/' && language) {
      // Redirect root path to language-prefixed path
      setLocation(`/${language}`);
    }
  }, [location, language, setLanguage, i18n, setLocation]);

  // Catch-all route match for language prefix
  const [isLangMatch, params] = useRoute('/:lang/*');
  
  if (isLangMatch && ['en', 'ja', 'ko'].includes(params.lang)) {
    const currentLang = params.lang as Language;
    const restOfPath = params['*'] || '';
    
    return (
      <Switch>
        <Route path={`/${currentLang}`} component={Home} />
        <Route path={`/${currentLang}/about`} component={About} />
        <Route path={`/${currentLang}/projects`} component={Projects} />
        <Route path={`/${currentLang}/blog`} component={Blog} />
        <Route path={`/${currentLang}/blog/:id`} component={Blog} />
        <Route path={`/${currentLang}/contact`} component={Contact} />
        <Route path={`/${currentLang}/privacy-policy`} component={PrivacyPolicy} />
        <Route path={`/${currentLang}/terms-of-service`} component={TermsOfService} />
        <Route path={`/${currentLang}/cookie-policy`} component={CookiePolicy} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // If no language match, render root routes that will redirect
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/:path*" component={() => {
        // Redirect any route without language prefix to current language
        const currentPath = location === '/' ? '' : location;
        useEffect(() => {
          setLocation(`/${language}${currentPath}`);
        }, []);
        return null;
      }} />
    </Switch>
  );
}