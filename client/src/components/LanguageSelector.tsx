import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLocation } from 'wouter';

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  
  // Determine if we're on the homepage
  const isHomepage = location === '/';
  
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  // Find current language details
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  // Use the same styling logic as the Nav links
  const linkClasses = isHomepage
    ? "text-white dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
    : "text-gray-800 dark:text-white hover:text-primary-500 hover:dark:text-primary-400 transition-colors";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <span 
          className={`flex items-center gap-1.5 cursor-pointer ${linkClasses}`}
          aria-label="Select language"
        >
          <Globe className="h-4 w-4" />
          <span>{currentLanguage.flag}</span>
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
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}