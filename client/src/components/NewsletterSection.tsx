import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
}

export function NewsletterSection({ 
  title = "Subscribe to my newsletter",
  description = "Get the latest insights, articles, and resources delivered to your inbox." 
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  return (
    <motion.div 
      className="mt-24 mb-12 bg-gradient-to-r from-primary-600 to-primary-800 rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-12 md:p-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-4">
              {title}
            </h3>
            <p className="text-primary-100 mb-6">
              {description}
            </p>
            
            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
              <h4 className="text-white font-bold mb-3">Newsletter benefits:</h4>
              <ul className="space-y-2 text-primary-100">
                <BenefitItem text="Early access to new articles and tools" />
                <BenefitItem text="Exclusive resources not published on the blog" />
                <BenefitItem text="Tips and techniques from industry experts" />
                <BenefitItem text="Opportunities to join private workshops" />
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Thanks for subscribing!</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    You'll receive your first newsletter soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                    Join the newsletter
                  </h4>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <svg className="h-5 w-5 mr-2 text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  );
}