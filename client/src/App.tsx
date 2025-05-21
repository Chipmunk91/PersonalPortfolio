import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

// English Pages
import EnHome from "@/pages/en/Home";
import EnAbout from "@/pages/en/About";
import EnProjects from "@/pages/en/Projects";
import EnBlog from "@/pages/en/Blog";
import EnContact from "@/pages/en/Contact";
import EnPrivacyPolicy from "@/pages/en/PrivacyPolicy";
import EnTermsOfService from "@/pages/en/TermsOfService";
import EnCookiePolicy from "@/pages/en/CookiePolicy";
import EnNotFound from "@/pages/en/not-found";

// Japanese Pages
import JaHome from "@/pages/ja/Home";
import JaAbout from "@/pages/ja/About";
import JaProjects from "@/pages/ja/Projects";
import JaBlog from "@/pages/ja/Blog";
import JaContact from "@/pages/ja/Contact";
import JaPrivacyPolicy from "@/pages/ja/PrivacyPolicy";
import JaTermsOfService from "@/pages/ja/TermsOfService";
import JaCookiePolicy from "@/pages/ja/CookiePolicy";
import JaNotFound from "@/pages/ja/not-found";

// Korean Pages
import KoHome from "@/pages/ko/Home";
import KoAbout from "@/pages/ko/About";
import KoProjects from "@/pages/ko/Projects";
import KoBlog from "@/pages/ko/Blog";
import KoContact from "@/pages/ko/Contact";
import KoPrivacyPolicy from "@/pages/ko/PrivacyPolicy";
import KoTermsOfService from "@/pages/ko/TermsOfService";
import KoCookiePolicy from "@/pages/ko/CookiePolicy";
import KoNotFound from "@/pages/ko/not-found";

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
      
      {/* English Routes */}
      <Route path="/en" component={EnHome} />
      <Route path="/en/about" component={EnAbout} />
      <Route path="/en/projects" component={EnProjects} />
      <Route path="/en/blog" component={EnBlog} />
      <Route path="/en/blog/:id" component={EnBlog} />
      <Route path="/en/contact" component={EnContact} />
      <Route path="/en/privacy-policy" component={EnPrivacyPolicy} />
      <Route path="/en/terms-of-service" component={EnTermsOfService} />
      <Route path="/en/cookie-policy" component={EnCookiePolicy} />
      <Route path="/en/*" component={EnNotFound} />
      
      {/* Japanese Routes */}
      <Route path="/ja" component={JaHome} />
      <Route path="/ja/about" component={JaAbout} />
      <Route path="/ja/projects" component={JaProjects} />
      <Route path="/ja/blog" component={JaBlog} />
      <Route path="/ja/blog/:id" component={JaBlog} />
      <Route path="/ja/contact" component={JaContact} />
      <Route path="/ja/privacy-policy" component={JaPrivacyPolicy} />
      <Route path="/ja/terms-of-service" component={JaTermsOfService} />
      <Route path="/ja/cookie-policy" component={JaCookiePolicy} />
      <Route path="/ja/*" component={JaNotFound} />
      
      {/* Korean Routes */}
      <Route path="/ko" component={KoHome} />
      <Route path="/ko/about" component={KoAbout} />
      <Route path="/ko/projects" component={KoProjects} />
      <Route path="/ko/blog" component={KoBlog} />
      <Route path="/ko/blog/:id" component={KoBlog} />
      <Route path="/ko/contact" component={KoContact} />
      <Route path="/ko/privacy-policy" component={KoPrivacyPolicy} />
      <Route path="/ko/terms-of-service" component={KoTermsOfService} />
      <Route path="/ko/cookie-policy" component={KoCookiePolicy} />
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
