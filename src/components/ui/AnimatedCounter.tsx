import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
  className?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 1000,
  suffix = '',
  prefix = '',
  separator = '',
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState(start);
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });

  useEffect(() => {
    if (!isIntersecting) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Simple linear animation for better performance
      const currentValue = start + progress * (end - start);

      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isIntersecting, end, start, duration, decimals]);

  const formatNumber = (num: number) => {
    if (separator && num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={
        isIntersecting ? { opacity: 1 } : { opacity: 0 }
      }
      transition={{ duration: 0.2 }}
      role="status"
      aria-live="polite"
      aria-label={`Counter: ${prefix}${formatNumber(count)}${suffix}`}
    >
      {prefix}
      {formatNumber(count)}
      {suffix}
    </motion.div>
  );
};

export default AnimatedCounter;
