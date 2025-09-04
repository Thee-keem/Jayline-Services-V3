import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
