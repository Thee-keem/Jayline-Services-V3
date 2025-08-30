import React from 'react';
import { motion } from 'framer-motion';

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
  duration = 0.6,
  animationType = 'words',
  staggerDelay = 0.08,
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
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.6, -0.05, 0.01, 0.99],
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
