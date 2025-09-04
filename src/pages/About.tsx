import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
} from 'lucide-react';

import SEO from '../lib/seo';
import {
  AnimatedText,
  ParallaxSection,
  FloatingElements,
} from '../components/ui';
import { TestimonialsSection } from '../components/sections';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from '../utils/animations';

const About = () => {
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();
  const { ref: storyRef, isIntersecting: storyInView } =
    useIntersectionObserver();

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Jay Line Services - Kenya's leading HR and manpower solutions provider with 15+ years of experience serving 100+ corporate clients."
        keywords={[
          'about Jay Line Services',
          'HR company Kenya',
          'manpower solutions provider',
          'human resource consultancy',
        ]}
      />

      <div>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 text-white py-20 overflow-hidden transition-colors duration-300"
        >
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl font-bold mb-6">
                  <AnimatedText text="About Jay Line Services" />
                </h1>
              </motion.div>
              <motion.p
                className="text-xl text-green-100 max-w-3xl mx-auto"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                Your trusted partner in human resource solutions, manpower
                services, and business growth for over 15 years
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <ParallaxSection speed={-0.2}>
          <section ref={storyRef} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="hidden"
                  animate={storyInView ? 'visible' : 'hidden'}
                  variants={fadeInLeft}
                >
                  <motion.h2
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                    variants={fadeInUp}
                  >
                    Our Story
                  </motion.h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={storyInView ? 'visible' : 'hidden'}
                  >
                    <motion.p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                      variants={fadeInUp}
                    >
                      Founded with a vision to bridge the gap between talented
                      professionals and growing businesses, Jay Line Services has
                      evolved into Kenya's premier human resource and manpower
                      solutions provider.
                    </motion.p>
                    <motion.p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                      variants={fadeInUp}
                    >
                      Since our inception, we have been committed to delivering
                      exceptional service quality, building lasting partnerships,
                      and contributing to the economic growth of Kenya through
                      strategic workforce solutions.
                    </motion.p>
                    <motion.p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                      variants={fadeInUp}
                    >
                      Today, we proudly serve over 100 corporate clients across
                      various industries, having successfully placed more than 500
                      professionals in their dream careers.
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={storyInView ? 'visible' : 'hidden'}
                  >
                    {[
                      'ISO Certified Company',
                      'Licensed HR Consultancy',
                      'Member of IHRM Kenya',
                      'Award-Winning Service',
                    ].map((text, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center"
                        variants={fadeInUp}
                        whileHover={{ x: 5, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="bg-green-50 dark:bg-gray-800 p-8 rounded-2xl transition-colors duration-300"
                  initial="hidden"
                  animate={storyInView ? 'visible' : 'hidden'}
                  variants={fadeInRight}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={storyInView ? 'visible' : 'hidden'}
                  >
                    <motion.h3
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                      variants={fadeInUp}
                    >
                      Our Mission
                    </motion.h3>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                      variants={fadeInUp}
                    >
                      To empower businesses and individuals through innovative
                      human resource solutions, fostering growth, productivity,
                      and success in the Kenyan market.
                    </motion.p>

                    <motion.h3
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                      variants={fadeInUp}
                    >
                      Our Vision
                    </motion.h3>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                      variants={fadeInUp}
                    >
                      To be the leading human resource and manpower solutions
                      provider in East Africa, recognized for excellence,
                      innovation, and transformative impact.
                    </motion.p>

                    <motion.h3
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
                      variants={fadeInUp}
                    >
                      Our Values
                    </motion.h3>
                    <motion.ul
                      className="space-y-2 text-gray-700 dark:text-gray-300"
                      variants={staggerContainer}
                      initial="hidden"
                      animate={storyInView ? 'visible' : 'hidden'}
                    >
                      {[
                        'Integrity & Transparency',
                        'Excellence in Service Delivery',
                        'Innovation & Adaptability',
                        'Client-Centric Approach',
                      ].map((value, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center"
                          variants={fadeInUp}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full mr-3"
                            whileHover={{ scale: 1.5 }}
                          />
                          {value}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </ParallaxSection>

        {/* Client Testimonials */}
        <TestimonialsSection />
      </div>
    </>
  );
};

export default About;