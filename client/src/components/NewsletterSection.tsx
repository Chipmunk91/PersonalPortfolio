import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
}

export function NewsletterSection({ 
  title,
  description
}: NewsletterSectionProps) {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Use provided title/description or fallback to translations
  const newsletterTitle = title || t('newsletter.title');
  const newsletterDescription = description || t('newsletter.description');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Make a direct fetch request instead of using apiRequest
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          name: name || undefined // Only send name if provided
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t('newsletter.errors.failed'));
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      setName('');
      
      toast({
        title: t('newsletter.toast.success.title'),
        description: t('newsletter.toast.success.description'),
      });
    } catch (err) {
      setIsSubmitting(false);
      const errorMessage = err instanceof Error ? err.message : t('newsletter.errors.generic');
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: t('newsletter.toast.error.title'),
        description: errorMessage,
      });
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <motion.div 
      className="mt-24 mb-12 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {newsletterTitle}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {newsletterDescription}
        </p>
        
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="md:w-1/2 bg-white dark:bg-black p-6 rounded-lg shadow-md">
            <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-4">{t('newsletter.benefits.title')}</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <BenefitItem text={t('newsletter.benefits.items.earlyAccess')} />
              <BenefitItem text={t('newsletter.benefits.items.exclusiveResources')} />
              <BenefitItem text={t('newsletter.benefits.items.expertTips')} />
              <BenefitItem text={t('newsletter.benefits.items.workshops')} />
            </ul>
          </div>
          
          <div className="md:w-1/2 bg-white dark:bg-black p-6 rounded-lg shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary-600 dark:text-primary-300" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{t('newsletter.success.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('newsletter.success.message')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="mx-auto"
                >
                  {t('newsletter.success.subscribeAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                  {t('newsletter.form.title')}
                </h4>
                
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('newsletter.form.nameLabel')}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('newsletter.form.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('newsletter.form.emailLabel')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('newsletter.form.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  />
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('newsletter.form.subscribing')}
                    </>
                  ) : t('newsletter.form.submit')}
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  {t('newsletter.form.privacyNotice')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <svg className="h-5 w-5 mr-2 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  );
}