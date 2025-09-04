import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 transform-gpu z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgress;
