import { Button } from "@/components/ui/button";
import { TimelineItem } from "./TimelineItem";
import { SkillTag } from "./SkillTag";
import { 
  Linkedin, Twitter, Github, FileText, MessageSquare 
} from "lucide-react";
import { FaMedium, FaPlay } from "react-icons/fa";
import { skills, timelineItems } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function AboutSection() {
  const { t } = useTranslation('about');
  
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/5">
            {/* Profile Image */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-xl mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
                alt={t('profile.altText')} 
                className="w-full h-auto" 
              />
            </motion.div>
            
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-8">
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
            
            {/* Video Introduction */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('video.title')}</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                  <FaPlay className="h-12 w-12" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('video.description')}
              </p>
            </div>

          </div>
          
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {t('bio')}
              </p>
            </motion.div>
            
            {/* Interactive Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('timeline.title')}</h3>
              <div className="relative pl-10 mb-12">
                {timelineItems.map((item, index) => (
                  <TimelineItem 
                    key={index}
                    title={item.title}
                    period={item.period}
                    description={item.description}
                    isLast={index === timelineItems.length - 1}
                  />
                ))}
              </div>
            </motion.div>
            
            {/* Skills Visualization - Grouped with Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{t('skills.title')}</h3>
              
              {/* Data Visualization */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">{t('skills.categories.dataViz')}</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {skills
                    .filter(skill => skill.category === 'visualization')
                    .map((skill, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">95%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Web Development */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-secondary-600 dark:text-secondary-400 mb-3">{t('skills.categories.webDev')}</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {skills
                    .filter(skill => skill.category === 'frontend' || skill.category === 'languages')
                    .map((skill, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {skill.category === 'frontend' ? '90%' : '85%'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-secondary-500 h-2 rounded-full" 
                            style={{ width: skill.category === 'frontend' ? '90%' : '85%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* AI & Data Science */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-accent-600 dark:text-accent-400 mb-3">{t('skills.categories.aiData')}</h4>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {skills
                    .filter(skill => skill.category === 'ai' || skill.category === 'data' || skill.category === 'ux')
                    .map((skill, index) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {skill.category === 'ai' ? '92%' : skill.category === 'data' ? '88%' : '80%'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-accent-500 h-2 rounded-full" 
                            style={{ 
                              width: skill.category === 'ai' ? '92%' : skill.category === 'data' ? '88%' : '80%' 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
