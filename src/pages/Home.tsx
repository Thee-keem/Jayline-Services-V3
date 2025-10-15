import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Clock,
  CheckCircle,
  Shield,
} from 'lucide-react';

import SEO from '../lib/seo';
import {
  AnimatedText,
  FloatingElements,
} from '../components/ui';
import { ServicesSection } from '../components/sections';
import { Footer } from '../components/layout';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from '../utils/animations';

const Home = () => {
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();
  const { ref: whyChooseRef, isIntersecting: whyChooseInView } =
    useIntersectionObserver();

  return (
    <>
      <SEO
        title="Jay Line Services - Your Trusted HR Partner in Kenya"
        description="Leading provider of comprehensive human resource solutions, manpower services, and financial consultancy in Kenya. 15+ years of experience serving 100+ corporate clients."
        keywords={[
          'HR services Kenya',
          'manpower solutions',
          'recruitment Kenya',
          'payroll management',
          'executive search',
          'Jay Line Services',
        ]}
      />

      <div className="snap-y snap-mandatory h-screen overflow-y-auto scrollbar-hide">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 snap-start snap-always"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/fallback.jpg)',
              willChange: 'transform',
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate={heroInView ? 'visible' : 'hidden'}
                variants={fadeInLeft}
              >
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <AnimatedText text="Your Trusted HR Partner in Kenya" />
                </h1>
                <motion.p
                  className="text-xl text-gray-100 mb-8 leading-relaxed"
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
                  <div className="flex flex-col gap-4 w-full">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/services"
                        className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center w-full shadow-lg"
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
                        className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center justify-center w-full shadow-lg"
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
                animate={heroInView ? 'visible' : 'hidden'}
                variants={fadeInRight}
              >
                <motion.div
                  className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl transition-colors duration-300"
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
                    animate={heroInView ? 'visible' : 'hidden'}
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
                        <span className="text-gray-800 dark:text-gray-300">
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

        {/* Key Services Preview */}
        <div className="min-h-screen flex items-center justify-center snap-start snap-always bg-white dark:bg-gray-900 transition-colors duration-300">
          <ServicesSection />
        </div>

        {/* Why Choose Us */}
        <section
          ref={whyChooseRef}
          className="min-h-screen flex flex-col snap-start snap-always bg-gray-900 dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="flex-1 flex items-center py-8">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <motion.div
                  initial="hidden"
                  animate={whyChooseInView ? 'visible' : 'hidden'}
                  variants={fadeInLeft}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Why Jay Line Services is Your Best Choice
                  </h2>
                  <p className="text-base md:text-lg text-gray-300 mb-5">
                    We combine years of experience with innovative approaches to
                    deliver exceptional HR and manpower solutions that drive
                    business success.
                  </p>

                  <motion.div
                    className="space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={whyChooseInView ? 'visible' : 'hidden'}
                  >
                    {[
                      {
                        icon: Award,
                        title: 'Proven Excellence',
                        description:
                          'Over 15 years of delivering outstanding results for businesses across Kenya.',
                      },
                      {
                        icon: Shield,
                        title: 'Trusted Partnership',
                        description:
                          'We build long-term relationships based on trust, reliability, and mutual success.',
                      },
                      {
                        icon: Clock,
                        title: 'Fast Response',
                        description:
                          'Quick turnaround times and 24/7 support to meet your urgent business needs.',
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        variants={fadeInUp}
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <item.icon className="w-5 h-5 text-green-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-base font-semibold text-white mb-0.5">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="bg-green-600 text-white p-6 rounded-2xl transition-colors duration-300"
                  initial="hidden"
                  animate={whyChooseInView ? 'visible' : 'hidden'}
                  variants={fadeInRight}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <h3 className="text-xl font-bold mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-green-100 mb-4 text-sm">
                    Contact us today for a free consultation and discover how we
                    can help your business achieve its goals.
                  </p>
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/contact"
                        className="block bg-white text-green-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center text-sm"
                      >
                        Get Free Consultation
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/services"
                        className="block border-2 border-green-400 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-500 transition-colors text-center focus-visible-ring text-sm"
                      >
                        View Our Services
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Home;