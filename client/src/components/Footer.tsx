import { Linkedin, Twitter, Github } from 'lucide-react';
import { FaMedium } from 'react-icons/fa';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="/" className="text-2xl font-bold">
              Hiroshi<span className="text-primary-500">.dev</span>
            </a>
            <p className="text-gray-400 mt-2 max-w-md">
              {t('hero.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h4 className="font-medium mb-3">{t('footer.navigation')}</h4>
              <ul className="space-y-2">
                <li><Link href="/about" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.about')}</Link></li>
                <li><Link href="/projects" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.projects')}</Link></li>
                <li><Link href="/blog" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.blog')}</Link></li>
                <li><Link href="/contact" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link></li>
                <li><Link href="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.termsOfService')}</Link></li>
                <li><Link href="/cookie-policy" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-white transition-colors">{t('footer.cookiePolicy')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <FaMedium className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
