import { motion } from 'framer-motion';

interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  isLast: boolean;
}

export function TimelineItem({ title, period, description, isLast }: TimelineItemProps) {
  return (
    <motion.div 
      className={`timeline-item relative pb-8 ml-6 ${isLast ? 'lastItem' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {!isLast && (
        <div className="timeline-line absolute left-[-30px] top-8 bottom-[-30px] w-[2px] bg-gray-200 dark:bg-gray-700" />
      )}
      
      <div className="relative">
        <div className="absolute left-[-37px] top-0 w-4 h-4 rounded-full bg-primary-500 border-3 border-white dark:border-gray-900" />
        
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{period}</p>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}
