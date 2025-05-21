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

export function LanguageSelector() {
  const { i18n } = useTranslation('common');
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
    i18n.changeLanguage(langCode);
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
          className={`flex items-center gap-1.5 cursor-pointer ${linkClasses}`}
          aria-label={i18n.t('languageSelector.language')}
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.flag}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
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