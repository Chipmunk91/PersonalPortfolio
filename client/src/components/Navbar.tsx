import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

type LanguageRouteParams = {
  lang?: string;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation('common');
  const { language } = useLanguage();
  const { lang } = useParams<LanguageRouteParams>();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine if we're on the homepage
  const isHomepage = location === `/${lang}` || location === '/';

  const navClasses = isScrolled || !isHomepage
    ? "fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-white dark:bg-gray-900 shadow-md"
    : "fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-transparent";
  
  const linkClasses = isScrolled || !isHomepage
    ? "text-gray-800 dark:text-white hover:text-primary-500 hover:dark:text-primary-400 transition-colors"
    : "text-white dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors";

  // Generate language-aware URLs
  const getUrl = (path: string) => {
    const urlLang = lang || language;
    return `/${urlLang}${path}`;
  };

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            href={getUrl('')} 
            onClick={() => window.scrollTo(0, 0)} 
            className={`text-2xl font-bold ${isScrolled || !isHomepage ? 'text-gray-900 dark:text-white' : 'text-white dark:text-white'}`}
          >
            Hiroshi<span className="text-primary-500">.dev</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href={getUrl('/about')} onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">{t('nav.about')}</Link>
                  <Link href={getUrl('/projects')} onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">{t('nav.projects')}</Link>
                  <Link href={getUrl('/blog')} onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">{t('nav.blog')}</Link>
                  <Link href={getUrl('/contact')} onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">{t('nav.contact')}</Link>
                  <div className="px-3 py-2 flex items-center">
                    <LanguageSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href={getUrl('/about')} onClick={() => window.scrollTo(0, 0)} className={linkClasses}>{t('nav.about')}</Link>
              <Link href={getUrl('/projects')} onClick={() => window.scrollTo(0, 0)} className={linkClasses}>{t('nav.projects')}</Link>
              <Link href={getUrl('/blog')} onClick={() => window.scrollTo(0, 0)} className={linkClasses}>{t('nav.blog')}</Link>
              <Link href={getUrl('/contact')} onClick={() => window.scrollTo(0, 0)} className={linkClasses}>{t('nav.contact')}</Link>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
