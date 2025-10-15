import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Target, TrendingUp, GraduationCap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import { fadeInUp, staggerContainer } from '../../utils/animations';

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    icon: Users,
    title: 'HR Solutions',
    description: 'Complete human resource management including recruitment, payroll, and consultancy services',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#hr-solutions',
  },
  {
    icon: Target,
    title: 'Manpower Solutions',
    description: 'Flexible manpower supply and outsourced labor management for various industries',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#manpower-employment-services',
  },
  {
    icon: TrendingUp,
    title: 'Financial Solutions',
    description: 'Soft financing options and savings solutions to support your business growth',
    image: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#financial-advisory-services',
  },
  {
    icon: GraduationCap,
    title: 'Training & Development',
    description: 'Professional development programs to enhance workforce capabilities and career growth',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '/services#training-development',
  },
];

const ServicesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = services.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, goToNext]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrevious();
      setIsAutoPlaying(false);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
      setIsAutoPlaying(false);
    }
  }, [goToPrevious, goToNext]);

  const getSlidePosition = (index: number) => {
    const diff = (index - currentIndex + totalSlides) % totalSlides;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === totalSlides - 1) return 'left';
    return 'hidden';
  };

  return (
    <section className="w-full h-full flex flex-col justify-center py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col justify-center flex-1">
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Our Core Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer comprehensive HR and manpower solutions designed to meet your business needs
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="relative px-4 md:px-16"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Services carousel"
          aria-roledescription="carousel"
        >
          <div className="relative h-[350px] md:h-[420px]">
            <AnimatePresence initial={false} mode="sync">
              {services.map((service, index) => {
                const position = getSlidePosition(index);
                const isCenter = position === 'center';
                const isRight = position === 'right';
                const isLeft = position === 'left';
                const isHidden = position === 'hidden';

                let xOffset = 0;
                let scale = 0.85;
                let zIndex = 1;
                let opacity = 0.7;

                if (isCenter) {
                  xOffset = 0;
                  scale = 1;
                  zIndex = 10;
                  opacity = 1;
                } else if (isRight) {
                  xOffset = 75;
                  scale = 0.85;
                  zIndex = 5;
                  opacity = 0.7;
                } else if (isLeft) {
                  xOffset = -75;
                  scale = 0.85;
                  zIndex = 5;
                  opacity = 0.7;
                } else if (isHidden) {
                  xOffset = -130;
                  scale = 0.6;
                  zIndex = 0;
                  opacity = 0;
                }

                return (
                  <motion.div
                    key={index}
                    className="absolute left-1/2 top-1/2 w-[85%] md:w-[450px]"
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${xOffset}%)`,
                      y: '-50%',
                      scale,
                      opacity,
                      zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${totalSlides}`}
                    aria-hidden={!isCenter}
                  >
                    <Link
                      to={isCenter ? service.link : '#'}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          goToSlide(index);
                        } else {
                          const hash = service.link.split('#')[1];
                          if (hash) {
                            setTimeout(() => {
                              const element = document.getElementById(hash);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }, 100);
                          }
                        }
                      }}
                      className={`relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer block ${
                        !isCenter ? 'pointer-events-auto' : ''
                      }`}
                      style={{
                        pointerEvents: 'auto',
                      }}
                    >
                      <div className="aspect-[4/3] relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gray-700/70 dark:bg-gray-800/70 backdrop-blur-sm px-6 py-4">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        {isCenter && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-gray-200 text-sm"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => {
              goToPrevious();
              setIsAutoPlaying(false);
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>

          <motion.button
            onClick={() => {
              goToNext();
              setIsAutoPlaying(false);
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </motion.button>

          <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Carousel navigation">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-green-600 dark:bg-green-400 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                role="tab"
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/services"
              className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;