// Animation utilities and configurations
import { getReducedMotionPreference } from './performance';

// Check for reduced motion preference
const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on user preferences
const getOptimizedDuration = (duration: number): number => {
  return shouldReduceMotion() ? 0 : Math.min(duration, 0.3);
};

const getOptimizedTransition = (transition: any) => {
  if (shouldReduceMotion()) {
    return { duration: 0 };
  }
  return { ...transition, duration: Math.min(transition.duration || 0.3, 0.3) };
};

// Framer Motion variants
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
};

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -20,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 20,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: shouldReduceMotion() ? 0 : 0.02,
      delayChildren: shouldReduceMotion() ? 0 : 0.02,
    },
  },
};

export const slideInFromBottom = {
  hidden: {
    opacity: 0,
    y: 30,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: getOptimizedTransition({ duration: 0.2 }),
  },
};
