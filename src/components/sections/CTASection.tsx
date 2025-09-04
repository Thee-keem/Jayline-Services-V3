import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { FloatingElements } from '../ui';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const CTASection: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className="relative py-20 bg-green-600 dark:bg-green-700 text-white overflow-hidden transition-colors duration-300"
    >
      <FloatingElements />
      <div className="max-w-7xl mx-auto px-4 text-center relative">
        <motion.div
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Contact us today to discuss how our comprehensive HR and manpower
            solutions can drive your business success
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center min-w-[220px]"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="tel:+254722311490"
                  className="border-2 border-green-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors text-center min-w-[220px]"
                >
                  Call Now: +254 722 311 490
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;