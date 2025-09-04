import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { AnimatedText, FloatingElements } from '../ui';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';

const HeroSection: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 py-20 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-green-600 dark:bg-green-700 opacity-5"></div>
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            variants={fadeInLeft}
          >
            <AnimatedText
              text="Your Trusted HR Partner in Kenya"
              className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            />
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Jay Line Services provides comprehensive human resource solutions, manpower services, and financial consultancy to help your business thrive in today's competitive market.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/services"
                    className="bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center min-w-[220px]"
                  >
                    Explore Our Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-center min-w-[220px]"
                  >
                    Get Free Consultation
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative"
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            variants={fadeInRight}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl transition-colors duration-300"
              whileHover={{
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Jay Line Services?
              </h3>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate={isIntersecting ? 'visible' : 'hidden'}
              >
                {[
                  '15+ Years of Experience',
                  '500+ Successful Placements',
                  '100+ Corporate Clients',
                  '24/7 Professional Support',
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;