import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const { i18n, t } = useTranslation('common');
  const { language, setLanguage, languages, currentLanguageOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Track scroll position to match navbar behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initial check
    setIsScrolled(window.scrollY > 50);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Determine if we're on the homepage
  const isHomepage = location === '/';
  
  const handleSelectLanguage = (langCode: string) => {
    // Update language in context (which also updates i18n)
    setLanguage(langCode as any);
    setIsOpen(false);
    
    // Add language switching event to analytics if available
    if (window.gtag) {
      window.gtag('event', 'language_change', {
        'language': langCode
      });
    }
  };
  
  // Use the same styling logic as the Nav links
  const linkClasses = isScrolled || !isHomepage
    ? "text-gray-800 dark:text-white hover:text-primary-500 hover:dark:text-primary-400 transition-colors"
    : "text-white dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <span 
          className={`flex items-center gap-1.5 cursor-pointer ${linkClasses}`}
          aria-label={t('languageSelector.language')}
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguageOption.flag}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 cursor-pointer ${language === lang.code ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
            onClick={() => handleSelectLanguage(lang.code)}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {language === lang.code && (
              <span className="text-primary-500 text-xs font-medium">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}