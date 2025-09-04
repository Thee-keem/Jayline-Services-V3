import React from 'react';
import { motion } from 'framer-motion';

import { AnimatedCounter } from '../ui';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { scaleIn, staggerContainer } from '../../utils/animations';

const StatsSection: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="py-20 bg-green-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid md:grid-cols-4 gap-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
        >
          {[
            { number: 15, suffix: '+', label: 'Years Experience' },
            { number: 500, suffix: '+', label: 'Successful Placements' },
            { number: 100, suffix: '+', label: 'Corporate Clients' },
            { number: 98, suffix: '%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div key={index} variants={scaleIn}>
              <AnimatedCounter
                end={stat.number}
                suffix={stat.suffix}
                className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
              />
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;