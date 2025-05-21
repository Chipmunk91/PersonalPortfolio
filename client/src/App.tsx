import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

// English Pages (Other pages still using language-specific implementations)
import EnProjects from "@/pages/en/Projects";
import EnBlog from "@/pages/en/Blog";
import EnContact from "@/pages/en/Contact";
import EnNotFound from "@/pages/en/not-found";

// Japanese Pages (Other pages still using language-specific implementations)
import JaProjects from "@/pages/ja/Projects";
import JaBlog from "@/pages/ja/Blog";
import JaContact from "@/pages/ja/Contact";
import JaNotFound from "@/pages/ja/not-found";

// Korean Pages (Other pages still using language-specific implementations)
import KoProjects from "@/pages/ko/Projects";
import KoBlog from "@/pages/ko/Blog";
import KoContact from "@/pages/ko/Contact";
import KoNotFound from "@/pages/ko/not-found";

// Dynamic Localized Pages
import HomePage from "@/pages/[lang]/Home";
import AboutPage from "@/pages/[lang]/About";
import PrivacyPolicyPage from "@/pages/[lang]/PrivacyPolicy";
import TermsOfServicePage from "@/pages/[lang]/TermsOfService";
import CookiePolicyPage from "@/pages/[lang]/CookiePolicy";

// Fallback NotFound
import NotFound from "@/pages/not-found";

// Language Redirect Component 
function LanguageRedirect() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    navigate(`/${language}`);
  }, [language, navigate]);
  
  return null;
}

// Main Router component
function Router() {
  const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [location] = useLocation();
  
  // Handle language detection from URL
  useEffect(() => {
    const pathLang = location.split('/')[1];
    if (['en', 'ja', 'ko'].includes(pathLang) && pathLang !== language) {
      setLanguage(pathLang as any);
      i18n.changeLanguage(pathLang);
    }
  }, [location, language, setLanguage, i18n]);
  
  return (
    <Switch>
      {/* Root redirects to language path */}
      <Route path="/" component={LanguageRedirect} />
      
      {/* Dynamic Localized Pages */}
      <Route path="/:lang" component={HomePage} />
      <Route path="/:lang/about" component={AboutPage} />
      <Route path="/:lang/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/:lang/terms-of-service" component={TermsOfServicePage} />
      <Route path="/:lang/cookie-policy" component={CookiePolicyPage} />
      
      {/* English Routes (still using language-specific implementations) */}
      <Route path="/en/projects" component={EnProjects} />
      <Route path="/en/blog" component={EnBlog} />
      <Route path="/en/blog/:id" component={EnBlog} />
      <Route path="/en/contact" component={EnContact} />
      <Route path="/en/*" component={EnNotFound} />
      
      {/* Japanese Routes (still using language-specific implementations) */}
      <Route path="/ja/projects" component={JaProjects} />
      <Route path="/ja/blog" component={JaBlog} />
      <Route path="/ja/blog/:id" component={JaBlog} />
      <Route path="/ja/contact" component={JaContact} />
      <Route path="/ja/*" component={JaNotFound} />
      
      {/* Korean Routes (still using language-specific implementations) */}
      <Route path="/ko/projects" component={KoProjects} />
      <Route path="/ko/blog" component={KoBlog} />
      <Route path="/ko/blog/:id" component={KoBlog} />
      <Route path="/ko/contact" component={KoContact} />
      <Route path="/ko/*" component={KoNotFound} />
      
      {/* 404 page for non-matched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
