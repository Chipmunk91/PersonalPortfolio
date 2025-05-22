import { motion } from 'framer-motion';

interface SkillTagProps {
  name: string;
  category: string;
  delay?: number;
}

export function SkillTag({ name, category, delay = 0 }: SkillTagProps) {
  return (
    <motion.div 
      className="skill-tag inline-flex items-center justify-center h-8 px-4 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200 text-sm cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-800 dark:hover:text-primary-100"
      data-category={category}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      {name}
    </motion.div>
  );
}
