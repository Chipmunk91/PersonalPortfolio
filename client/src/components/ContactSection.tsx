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
  Github
} from 'lucide-react';
import { FaMedium } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function ContactSection() {
  const [inquiryType, setInquiryType] = useState<string>('');
  
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
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" className="w-full" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">What are you looking for?</Label>
                  <Select onValueChange={setInquiryType}>
                    <SelectTrigger id="inquiry-type">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="speaking">Speaking Opportunity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Conditional fields based on selection */}
                {inquiryType === 'collaboration' && (
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select>
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
                    <Input id="eventDate" type="date" className="w-full" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} className="w-full" />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Book a Call</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Schedule a 30-minute call to discuss your project or collaboration opportunity.
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
                    <p className="text-gray-600 dark:text-gray-400">Calendly integration would appear here</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  Schedule Now
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 md:p-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a href="mailto:contact@hiroshi.dev" className="text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                        contact@hiroshi.dev
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white">Tokyo, Japan / Remote</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                      <Clock className="h-5 w-5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Working Hours</p>
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
