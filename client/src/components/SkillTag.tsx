import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillTagProps {
  name: string;
  category: string;
  delay?: number;
}

export function SkillTag({ name, category, delay = 0 }: SkillTagProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define particle colors based on category
  const getParticleColor = () => {
    switch (category) {
      case 'visualization':
        return 'bg-primary-500';
      case 'frontend':
      case 'languages':
        return 'bg-secondary-500';
      case 'ai':
      case 'data':
        return 'bg-accent-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Generate 5-10 particles with different animations
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    // Randomize the particle positions
    x: Math.random() * 60 - 30, // -30px to +30px
    y: Math.random() * -50 - 10, // -60px to -10px
    size: Math.random() * 6 + 4,  // 4px to 10px
    duration: Math.random() * 0.8 + 0.6 // 0.6s to 1.4s
  }));
  
  return (
    <motion.div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span 
        className={`skill-tag inline-block px-4 py-2 rounded-full text-sm cursor-pointer transition-colors
          ${category === 'visualization' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 hover:bg-primary-200 dark:hover:bg-primary-900/60' : 
          category === 'frontend' || category === 'languages' ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200 hover:bg-secondary-200 dark:hover:bg-secondary-900/60' : 
          category === 'ai' || category === 'data' ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200 hover:bg-accent-200 dark:hover:bg-accent-900/60' : 
          'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        data-category={category}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.2 } }}
      >
        {name}
      </motion.span>
      
      {/* Particle Animation */}
      <AnimatePresence>
        {isHovered && particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${getParticleColor()} z-10`}
            initial={{ 
              opacity: 0.8,
              scale: 0,
              x: 0, 
              y: 0,
              width: particle.size,
              height: particle.size
            }}
            animate={{ 
              opacity: 0,
              scale: 1,
              x: particle.x, 
              y: particle.y,
              width: particle.size,
              height: particle.size
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: particle.duration,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
