import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Target,
} from 'lucide-react';

import SEO from '../lib/seo';
import {
  AnimatedText,
  AnimatedCounter,
  ParallaxSection,
  FloatingElements,
} from '../components/ui';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
} from '../utils/animations';

const Home = () => {
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();
  const { ref: servicesRef, isIntersecting: servicesInView } =
    useIntersectionObserver();
  const { ref: statsRef, isIntersecting: statsInView } =
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

      <div>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 py-20 overflow-hidden transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-green-600 dark:bg-green-700 opacity-5"></div>
          <FloatingElements />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                animate={heroInView ? 'visible' : 'hidden'}
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
                animate={heroInView ? 'visible' : 'hidden'}
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

        {/* Key Services Preview */}
        <ParallaxSection speed={-0.3}>
          <section
            ref={servicesRef}
            className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="text-center mb-16"
                initial="hidden"
                animate={servicesInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
              >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Core Services
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  We offer comprehensive HR and manpower solutions designed to meet your business needs
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={servicesInView ? 'visible' : 'hidden'}
              >
                {[
                  {
                    icon: Users,
                    title: 'HR Solutions',
                    description: 'Complete human resource management including recruitment, payroll, and consultancy services.',
                    services: [
                      'Staff Recruitment & Mass Placement',
                      'HR Consultancy & Development',
                      'Professional Employer Organization',
                    ],
                  },
                  {
                    icon: Target,
                    title: 'Manpower Solutions',
                    description: 'Flexible manpower supply and outsourced labor management for various industries.',
                    services: [
                      'Manpower Supply',
                      'Outsourced Labor Management',
                      'Executive Search & Head Hunting',
                    ],
                  },
                  {
                    icon: TrendingUp,
                    title: 'Financial Solutions',
                    description: 'Soft financing options and savings solutions to support your business growth.',
                    services: [
                      'Soft Financing',
                      'Savings Programs',
                      'Salary Survey & Analysis',
                    ],
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:border-green-200 dark:hover:border-green-600"
                    variants={scaleIn}
                    whileHover={{
                      y: -10,
                      boxShadow:
                        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <service.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-6">
                      {service.services.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to="/services"
                        className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 flex items-center"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="text-center mt-12"
                initial="hidden"
                animate={servicesInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/services"
                    className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
                  >
                    View All Services
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="py-20 bg-green-50 dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-4 gap-8 text-center"
              variants={staggerContainer}
              initial="hidden"
              animate={statsInView ? 'visible' : 'hidden'}
            >
              {[
                { number: 15, suffix: '+', label: 'Years Experience' },
                { number: 500, suffix: '+', label: 'Successful Placements' },
                { number: 100, suffix: '+', label: 'Corporate Clients' },
                { number: 98, suffix: '%', label: 'Client Satisfaction' },
              ].map((stat, index) => (
                <motion.div key={index} variants={scaleIn}>
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2"
                  />
                  <div className="text-gray-700 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <ParallaxSection speed={0.2}>
          <section
            ref={whyChooseRef}
            className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial="hidden"
                  animate={whyChooseInView ? 'visible' : 'hidden'}
                  variants={fadeInLeft}
                >
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Why Jay Line Services is Your Best Choice
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    We combine years of experience with innovative approaches to
                    deliver exceptional HR and manpower solutions that drive
                    business success.
                  </p>

                  <motion.div
                    className="space-y-6"
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
                          className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="bg-green-600 dark:bg-green-700 text-white p-8 rounded-2xl transition-colors duration-300"
                  initial="hidden"
                  animate={whyChooseInView ? 'visible' : 'hidden'}
                  variants={fadeInRight}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <h3 className="text-2xl font-bold mb-6">
                    Ready to Get Started?
                  </h3>
                  <p className="text-green-100 dark:text-green-200 mb-6">
                    Contact us today for a free consultation and discover how we
                    can help your business achieve its goals.
                  </p>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/contact"
                        className="block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
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
                        className="block border-2 border-green-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-500 dark:hover:bg-green-600 transition-colors text-center"
                      >
                        View Our Services
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </ParallaxSection>
      </div>
    </>
  );
};

export default Home;
