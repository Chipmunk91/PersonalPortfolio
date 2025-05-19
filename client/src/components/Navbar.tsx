import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  
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
  const isHomepage = location === '/';

  const navClasses = isScrolled || !isHomepage
    ? "fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-white dark:bg-gray-900 shadow-md"
    : "fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-transparent";
  
  const linkClasses = isScrolled || !isHomepage
    ? "text-gray-800 dark:text-white hover:text-primary-500 hover:dark:text-primary-400 transition-colors"
    : "text-white dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors";

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" onClick={() => window.scrollTo(0, 0)} className={`text-2xl font-bold ${isScrolled || !isHomepage ? 'text-gray-900 dark:text-white' : 'text-white dark:text-white'}`}>
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
                  <Link href="/about" onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">About</Link>
                  <Link href="/projects" onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">Projects</Link>
                  <Link href="/blog" onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">Blog</Link>
                  <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className="px-3 py-2 text-base font-medium">Contact Me</Link>
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" onClick={() => window.scrollTo(0, 0)} className={linkClasses}>About</Link>
              <Link href="/projects" onClick={() => window.scrollTo(0, 0)} className={linkClasses}>Projects</Link>
              <Link href="/blog" onClick={() => window.scrollTo(0, 0)} className={linkClasses}>Blog</Link>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className={linkClasses}>Contact Me</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
