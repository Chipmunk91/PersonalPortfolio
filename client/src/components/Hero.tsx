import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "./ParticlesBackground";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation('common');
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 overflow-hidden">
        <ParticlesBackground />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="mb-12">
            <Button
              size="lg"
              className="px-8 py-6 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium text-lg transition-colors duration-300 shadow-lg hover:shadow-xl h-auto"
              onClick={() => {
                // Find the featured projects section by ID
                const featuredProjectsSection = document.getElementById('featured-projects');
                
                if (featuredProjectsSection) {
                  // Scroll to the featured projects section with smooth animation
                  featuredProjectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {t('hero.cta')}
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
            }}
          >
            <ChevronDown className="text-white h-8 w-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
