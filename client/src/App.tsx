import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";

// Base Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
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

// Language detection wrapper
function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  
  useEffect(() => {
    // Extract language from URL
    const pathLang = location.split('/')[1];
    if (['en', 'ja', 'ko'].includes(pathLang) && pathLang !== language) {
      setLanguage(pathLang as any);
      i18n.changeLanguage(pathLang);
    }
  }, [location, language, setLanguage, i18n]);
  
  return <>{children}</>;
}

// Main Router component
function Router() {
  return (
    <Switch>
      {/* Root redirects to language path */}
      <Route path="/" component={LanguageRedirect} />
      
      {/* Language Routes */}
      <Route path="/:lang">
        {(params) => {
          if (!['en', 'ja', 'ko'].includes(params.lang)) {
            return <NotFound />;
          }
          
          return (
            <LanguageWrapper>
              <Switch>
                <Route path="/:lang" component={Home} />
                <Route path="/:lang/about" component={About} />
                <Route path="/:lang/projects" component={Projects} />
                <Route path="/:lang/blog" component={Blog} />
                <Route path="/:lang/blog/:id" component={Blog} />
                <Route path="/:lang/contact" component={Contact} />
                <Route path="/:lang/privacy-policy" component={PrivacyPolicy} />
                <Route path="/:lang/terms-of-service" component={TermsOfService} />
                <Route path="/:lang/cookie-policy" component={CookiePolicy} />
              </Switch>
            </LanguageWrapper>
          );
        }}
      </Route>
      
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
