import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/components/TimelineItem";
import { motion } from 'framer-motion';
import { 
  Linkedin, Twitter, Github, FileText, MessageSquare 
} from "lucide-react";
import { FaMedium, FaPlay } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

// Import content
import profileData from "@/content/about/profile.json";
import careerData from "@/content/about/career.json";
import skillsData from "@/content/about/skills.json";

export default function KoreanAbout() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
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
                    src={profileData.profileImage} 
                    alt={profileData.name} 
                    className="w-full h-auto" 
                  />
                </motion.div>
                
                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  {profileData.socialLinks.map((link, index) => {
                    // Determine the icon based on platform
                    let Icon;
                    switch(link.platform) {
                      case 'linkedin': Icon = Linkedin; break;
                      case 'twitter': Icon = Twitter; break;
                      case 'github': Icon = Github; break;
                      case 'medium': Icon = FaMedium; break;
                      default: Icon = MessageSquare;
                    }
                    
                    return (
                      <a 
                        key={index}
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
                
                {/* Video Introduction */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    소개 영상
                  </h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                      <FaPlay className="h-12 w-12" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    제 업무와 기술에 대한 2분 소개 영상을 시청하세요.
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">소개</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    {profileData.bio}
                  </p>
                </motion.div>
                
                {/* Interactive Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">경력 여정</h3>
                  <div className="relative pl-10 mb-12">
                    {careerData.timeline.map((item, index) => (
                      <TimelineItem 
                        key={index}
                        title={item.title}
                        period={item.period}
                        description={item.description}
                        isLast={index === careerData.timeline.length - 1}
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
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">기술 및 전문 지식</h3>
                  
                  {skillsData.categories.map((category, categoryIndex) => {
                    // Define title and progress bar colors based on category
                    let titleColorClass = "text-primary-600 dark:text-primary-400";
                    let progressColorClass = "bg-primary-500";
                    
                    if (category.colorClass === "secondary") {
                      titleColorClass = "text-secondary-600 dark:text-secondary-400";
                      progressColorClass = "bg-secondary-500";
                    } else if (category.colorClass === "accent") {
                      titleColorClass = "text-accent-600 dark:text-accent-400";
                      progressColorClass = "bg-accent-500";
                    }
                    
                    // Translate category names
                    let categoryName = category.name;
                    if (category.name === "Data Visualization") {
                      categoryName = "데이터 시각화";
                    } else if (category.name === "Web Development") {
                      categoryName = "웹 개발";
                    } else if (category.name === "AI & Data Science") {
                      categoryName = "AI 및 데이터 과학";
                    }
                    
                    return (
                      <div key={categoryIndex} className="mb-8">
                        <h4 className={`text-lg font-medium ${titleColorClass} mb-3`}>
                          {categoryName}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          {category.skills.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex flex-col">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {skill.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {skill.proficiency}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`${progressColorClass} h-2 rounded-full`} 
                                  style={{ width: `${skill.proficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}