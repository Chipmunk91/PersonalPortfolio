import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Linkedin, 
  Twitter, 
  Github,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { FaMedium } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [eventDate, setEventDate] = useState('');
  
  // Form submission state
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const resetForm = () => {
    setName('');
    setEmail('');
    setInquiryType('');
    setMessage('');
    setBudget('');
    setTimeline('');
    setEventDate('');
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setError(null);
    
    try {
      // Prepare the form data
      const formData = {
        name,
        email,
        inquiryType,
        message,
        ...(inquiryType === 'project' ? { budget } : {}),
        ...(inquiryType === 'collaboration' ? { timeline } : {}),
        ...(inquiryType === 'speaking' ? { eventDate: eventDate ? new Date(eventDate).toISOString() : null } : {})
      };
      
      // Send the form data to the server
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
      
      // Form submitted successfully
      setFormStatus('success');
      resetForm();
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      // Reset success state after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      
    } catch (err) {
      setFormStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: errorMessage,
      });
    }
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Contact Form */}
      <motion.div 
        className="lg:w-3/5 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('form.title')}</h3>
        
        {formStatus === 'success' ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{t('success.title')}</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('success.message')}
            </p>
            <Button onClick={() => setFormStatus('idle')}>
              {t('success.sendAnother')}
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">{t('form.fullName')}</Label>
              <Input 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('form.email')}</Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="inquiry-type">{t('form.inquiryType')}</Label>
              <Select value={inquiryType} onValueChange={setInquiryType}>
                <SelectTrigger id="inquiry-type">
                  <SelectValue placeholder={t('form.selectOption')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">{t('form.project')}</SelectItem>
                  <SelectItem value="collaboration">{t('form.collaboration')}</SelectItem>
                  <SelectItem value="speaking">{t('form.speaking')}</SelectItem>
                  <SelectItem value="other">{t('form.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          
            {inquiryType === 'project' && (
              <div className="space-y-2">
                <Label htmlFor="budget">{t('form.budget.label')}</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder={t('form.budget.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">{t('form.budget.under5k')}</SelectItem>
                    <SelectItem value="5k-10k">{t('form.budget.5k10k')}</SelectItem>
                    <SelectItem value="10k-20k">{t('form.budget.10k20k')}</SelectItem>
                    <SelectItem value="20k+">{t('form.budget.20kPlus')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {inquiryType === 'collaboration' && (
              <div className="space-y-2">
                <Label htmlFor="timeline">{t('form.timeline.label')}</Label>
                <Select value={timeline} onValueChange={setTimeline}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder={t('form.timeline.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1">{t('form.timeline.lessThan1')}</SelectItem>
                    <SelectItem value="1-3">{t('form.timeline.1to3')}</SelectItem>
                    <SelectItem value="3-6">{t('form.timeline.3to6')}</SelectItem>
                    <SelectItem value="6+">{t('form.timeline.6Plus')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {inquiryType === 'speaking' && (
              <div className="space-y-2">
                <Label htmlFor="eventDate">{t('form.eventDate')}</Label>
                <Input 
                  id="eventDate" 
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="message">{t('form.message')}</Label>
              <Textarea 
                id="message" 
                rows={4} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full" 
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('form.sending')}
                </>
              ) : t('form.submit')}
            </Button>
          </form>
        )}
      </motion.div>
      
      {/* Contact Info and Booking */}
      <div className="lg:w-2/5">
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8 mb-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('bookCall.title')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('bookCall.description')}
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <div className="text-center py-8">
              <svg className="h-12 w-12 text-primary-500 mx-auto mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 14H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 14H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 18H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{t('bookCall.availableText')}</p>
              <Button 
                className="mt-2" 
                onClick={() => window.open('https://calendly.com', '_blank')}
              >
                {t('bookCall.button')}
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                {t('bookCall.placeholder')}
              </p>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{t('contactInfo.email.label')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('contactInfo.email.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{t('contactInfo.location.label')}</h4>
                <p className="text-gray-600 dark:text-gray-400">{t('contactInfo.location.value')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary-500 mt-1 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{t('contactInfo.workingHours.label')}</h4>
                <p className="text-gray-900 dark:text-white">{t('contactInfo.workingHours.value')}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('contactInfo.connect')}</p>
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://medium.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                aria-label="Medium Profile"
              >
                <FaMedium className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}