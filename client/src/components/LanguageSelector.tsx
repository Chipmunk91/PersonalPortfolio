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
import { languageOptions } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import { type Language } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  mobileMenu?: boolean;
}

export function LanguageSelector({ mobileMenu = false }: LanguageSelectorProps) {
  const { i18n } = useTranslation('common');
  const { setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
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
  
  // Extract current path without language prefix
  const getPathWithoutLang = (path: string): string => {
    const pathParts = path.split('/');
    if (pathParts.length > 1 && ['en', 'ja', 'ko'].includes(pathParts[1])) {
      return '/' + pathParts.slice(2).join('/');
    }
    return path;
  };

  // Determine if we're on the homepage
  const isHomepage = location.endsWith('/en') || 
                    location.endsWith('/ja') || 
                    location.endsWith('/ko') || 
                    location === '/';
  
  const handleSelectLanguage = (langCode: string) => {
    // Update i18n language
    i18n.changeLanguage(langCode);
    
    // Update language in context
    setLanguage(langCode as Language);
    
    // Update URL to reflect language change but keep current page
    const currentPath = getPathWithoutLang(location);
    const newPath = currentPath === '/' ? `/${langCode}` : `/${langCode}${currentPath}`;
    setLocation(newPath);
    
    setIsOpen(false);
  };
  
  // Find current language details
  const currentLanguage = languageOptions.find(lang => lang.code === i18n.language) || languageOptions[0];
  
  // Use the same styling logic as the Nav links
  const linkClasses = isScrolled || !isHomepage
    ? "text-gray-800 dark:text-white hover:text-primary-500 hover:dark:text-primary-400 transition-colors"
    : "text-white dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <span 
          className={`flex items-center gap-1.5 cursor-pointer ${
            mobileMenu 
              ? "text-gray-800 dark:text-white" 
              : linkClasses
          }`}
          aria-label={i18n.t('languageSelector.language')}
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.flag}</span>
          {mobileMenu && (
            <span className="ml-1 text-gray-800 dark:text-white">
              {currentLanguage.code.toUpperCase()}
            </span>
          )}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobileMenu ? "center" : "end"} className="w-48">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 cursor-pointer ${i18n.language === lang.code ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
            onClick={() => handleSelectLanguage(lang.code)}
          >
            <span className="text-base">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}