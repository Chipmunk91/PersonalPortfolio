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
import { ScheduleCallForm } from './ScheduleCallForm';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSection() {
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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contact Form */}
            <motion.div 
              className="lg:w-3/5 bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Send me a message</h3>
              
              {formStatus === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Message Sent!</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setFormStatus('idle')}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
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
                    <Label htmlFor="inquiry-type">What are you looking for?</Label>
                    <Select value={inquiryType} onValueChange={setInquiryType}>
                      <SelectTrigger id="inquiry-type">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project">Project/Hiring</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="speaking">Speaking Opportunity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                
                  {inquiryType === 'project' && (
                    <div className="space-y-2">
                      <Label htmlFor="budget">Project Budget</Label>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger id="budget">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                          <SelectItem value="20k+">$20,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {inquiryType === 'collaboration' && (
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Project Timeline</Label>
                      <Select value={timeline} onValueChange={setTimeline}>
                        <SelectTrigger id="timeline">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="less-than-1">Less than 1 month</SelectItem>
                          <SelectItem value="1-3">1-3 months</SelectItem>
                          <SelectItem value="3-6">3-6 months</SelectItem>
                          <SelectItem value="6+">6+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {inquiryType === 'speaking' && (
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
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
                    <Label htmlFor="message">Message</Label>
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
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info and Booking */}
            <div className="lg:w-2/5">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ScheduleCallForm />
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email</h4>
                      <p className="text-gray-600 dark:text-gray-400">contact@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Location</h4>
                      <p className="text-gray-600 dark:text-gray-400">Tokyo, Japan</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Working Hours</h4>
                      <p className="text-gray-900 dark:text-white">Mon-Fri: 9:00 AM - 6:00 PM JST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Connect with me</p>
                  <div className="flex gap-3">
                    <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                      <FaMedium className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}