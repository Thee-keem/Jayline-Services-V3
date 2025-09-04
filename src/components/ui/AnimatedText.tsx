import React from 'react';
import { motion } from 'framer-motion';

import { getReducedMotionPreference } from '../../utils/performance';

export type AnimationType = 'words' | 'letters' | 'lines';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: AnimationType;
  staggerDelay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.2,
  animationType = 'words',
  staggerDelay = 0.02,
}) => {
  const getTextSegments = () => {
    switch (animationType) {
      case 'letters':
        return text.split('');
      case 'lines':
        return text.split('\n');
      case 'words':
      default:
        return text.split(' ');
    }
  };

  const segments = getTextSegments();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: getReducedMotionPreference() ? 0 : Math.min(staggerDelay, 0.02),
        delayChildren: getReducedMotionPreference() ? 0 : Math.min(delay, 0.1),
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: getReducedMotionPreference() ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getReducedMotionPreference() ? 0 : Math.min(duration, 0.2),
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      role="heading"
      aria-live="polite"
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block ${
            animationType === 'words'
              ? 'mr-2'
              : animationType === 'lines'
                ? 'block'
                : ''
          }`}
          style={{ transformOrigin: '50% 100%' }}
        >
          {segment}
          {animationType === 'letters' && segment === ' ' && '\u00A0'}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
