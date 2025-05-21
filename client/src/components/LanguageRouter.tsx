import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
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

// Simple language prefix wrapper component
const LanguageWrapper = ({ 
  component: Component, 
  supportedLanguages = ['en', 'ja', 'ko']
}: { 
  component: React.ComponentType<any>; 
  supportedLanguages?: string[];
}) => {
  const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [location] = useLocation();
  
  useEffect(() => {
    const pathParts = location.split('/');
    if (pathParts.length > 1) {
      const pathLang = pathParts[1];
      if (supportedLanguages.includes(pathLang) && pathLang !== language) {
        setLanguage(pathLang as Language);
        i18n.changeLanguage(pathLang);
      }
    }
  }, [location, language, setLanguage, i18n, supportedLanguages]);
  
  return <Component />;
};

// Simple redirect component
const Redirect = ({ to }: { to: string }) => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to);
  }, [to, setLocation]);
  return null;
};

export function LanguageRouter() {
  const { language } = useLanguage();
  const [location] = useLocation();
  
  // Root redirect handler
  if (location === '/') {
    return <Redirect to={`/${language}`} />;
  }
  
  // Check for non-language prefixed paths
  if (location !== '/' && 
      !location.startsWith('/en/') && 
      !location.startsWith('/ja/') && 
      !location.startsWith('/ko/') && 
      !location.startsWith('/en') && 
      !location.startsWith('/ja') && 
      !location.startsWith('/ko')) {
    return <Redirect to={`/${language}${location}`} />;
  }
  
  return (
    <Switch>
      {/* Language home routes */}
      <Route path="/en" component={() => <LanguageWrapper component={Home} />} />
      <Route path="/ja" component={() => <LanguageWrapper component={Home} />} />
      <Route path="/ko" component={() => <LanguageWrapper component={Home} />} />
      
      {/* Localized pages */}
      <Route path="/:lang/about" component={() => <LanguageWrapper component={About} />} />
      <Route path="/:lang/projects" component={() => <LanguageWrapper component={Projects} />} />
      <Route path="/:lang/blog" component={() => <LanguageWrapper component={Blog} />} />
      <Route path="/:lang/blog/:id" component={() => <LanguageWrapper component={Blog} />} />
      <Route path="/:lang/contact" component={() => <LanguageWrapper component={Contact} />} />
      <Route path="/:lang/privacy-policy" component={() => <LanguageWrapper component={PrivacyPolicy} />} />
      <Route path="/:lang/terms-of-service" component={() => <LanguageWrapper component={TermsOfService} />} />
      <Route path="/:lang/cookie-policy" component={() => <LanguageWrapper component={CookiePolicy} />} />
      
      {/* Catch all for 404s */}
      <Route component={NotFound} />
    </Switch>
  );
}