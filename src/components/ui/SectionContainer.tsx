import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'green';
  size?: 'sm' | 'md' | 'lg';
  as?: 'section' | 'div';
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  background = 'white',
  size = 'md',
  as: Component = 'section',
}) => {
  const backgrounds = {
    white: 'bg-white dark:bg-gray-900',
    gray: 'bg-gray-50 dark:bg-gray-800',
    green: 'bg-green-600 dark:bg-green-700',
  };

  const sizes = {
    sm: 'py-12',
    md: 'py-20',
    lg: 'py-24',
  };

  return (
    <Component className={`${sizes[size]} ${backgrounds[background]} transition-colors duration-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {children}
      </div>
    </Component>
  );
};

export default SectionContainer;