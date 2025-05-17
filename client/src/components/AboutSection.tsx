import { Button } from "@/components/ui/button";
import { TimelineItem } from "./TimelineItem";
import { SkillTag } from "./SkillTag";
import { 
  Linkedin, Twitter, Github, FileText, MessageSquare 
} from "lucide-react";
import { FaMedium, FaPlay } from "react-icons/fa";
import { skills, timelineItems } from '@/lib/data';
import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
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
                alt="Hiroshi Tanaka" 
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
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Quick Introduction</h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                  <FaPlay className="h-12 w-12" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A brief 30-second introduction to my work and expertise in AI visualization
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 py-6 h-auto">
                <FileText className="h-4 w-4" />
                <span>Resume</span>
              </Button>
              <Button className="flex-1 flex items-center justify-center gap-2 py-6 h-auto">
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </Button>
            </div>
          </div>
          
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm a data scientist and visualization expert specializing in creating interactive tools that make AI systems more interpretable and accessible. With over 8 years of experience at the intersection of AI, data visualization, and UX design, I help organizations turn complex data into intuitive visual experiences.
              </p>
            </motion.div>
            
            {/* Interactive Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Career Journey</h3>
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
            
            {/* Skills Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {skills.map((skill, index) => (
                  <SkillTag 
                    key={index}
                    name={skill.name}
                    category={skill.category}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
