import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';

import SEO from '../lib/seo';
import {
  AnimatedText,
  ParallaxSection,
  FloatingElements,
} from '../components/ui';
import { ContactForm } from '../components/forms';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
} from '../utils/animations';

const Contact = () => {
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();
  const { ref: contactRef, isIntersecting: contactInView } =
    useIntersectionObserver();
  const { ref: mapRef, isIntersecting: mapInView } = useIntersectionObserver();
  const { ref: faqRef, isIntersecting: faqInView } = useIntersectionObserver();

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Jay Line Services for professional HR and manpower solutions. Contact us for a free consultation today."
        keywords={[
          'contact Jay Line Services',
          'HR consultation Kenya',
          'manpower services contact',
          'Nairobi HR company',
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
                  <AnimatedText text="Contact Us" />
                </h1>
              </motion.div>
              <motion.p
                className="text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                Ready to transform your business? Get in touch with our expert team today
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section
          ref={contactRef}
          className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                animate={contactInView ? 'visible' : 'hidden'}
                variants={fadeInLeft}
              >
                <motion.h2
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                  variants={fadeInUp}
                >
                  Send Us a Message
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  variants={fadeInUp}
                >
                  Fill out the form below and we'll get back to you within 24
                  hours
                </motion.p>

                <ContactForm />
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial="hidden"
                animate={contactInView ? 'visible' : 'hidden'}
                variants={fadeInRight}
              >
                <motion.h2
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                  variants={fadeInUp}
                >
                  Get in Touch
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                  variants={fadeInUp}
                >
                  We're here to help you find the perfect HR and manpower
                  solutions for your business
                </motion.p>

                <motion.div
                  className="space-y-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={contactInView ? 'visible' : 'hidden'}
                >
                  {[
                    {
                      icon: Phone,
                      title: 'Phone Numbers',
                      content: ['+254 722 311 490', '+254 734 271 863'],
                      subtitle: 'Available Monday - Friday, 8:00 AM - 6:00 PM',
                    },
                    {
                      icon: Mail,
                      title: 'Email Address',
                      content: ['info@jaylineservice.co.ke'],
                      subtitle: "We'll respond within 24 hours",
                      isLink: true,
                    },
                    {
                      icon: MapPin,
                      title: 'Office Address',
                      content: [
                        'Beliani Annex, Ground Floor',
                        'Along Kangundo Road',
                        'P.O. Box 5322-00100, Nairobi',
                        'Kenya',
                      ],
                    },
                    {
                      icon: Globe,
                      title: 'Website',
                      content: ['www.jaylineservice.co.ke'],
                      isLink: true,
                    },
                    {
                      icon: Clock,
                      title: 'Business Hours',
                      content: [
                        'Monday - Friday: 8:00 AM - 6:00 PM',
                        'Saturday: 9:00 AM - 2:00 PM',
                        'Sunday: Closed',
                      ],
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start group"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <item.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        {item.content.map((line, lineIndex) => (
                          <div key={lineIndex}>
                            {item.isLink && lineIndex === 0 ? (
                              <motion.a
                                href={
                                  item.title === 'Email Address'
                                    ? `mailto:${line}`
                                    : `http://${line}`
                                }
                                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                                whileHover={{ scale: 1.05 }}
                              >
                                {line}
                              </motion.a>
                            ) : (
                              <p className="text-gray-600 dark:text-gray-300">
                                {line}
                              </p>
                            )}
                          </div>
                        ))}
                        {item.subtitle && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <ParallaxSection speed={0.1}>
          <section
            ref={mapRef}
            className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                className="text-center mb-12"
                initial="hidden"
                animate={mapInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Find Our Office
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Visit us at our conveniently located office in Nairobi
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-colors duration-300"
                initial="hidden"
                animate={mapInView ? 'visible' : 'hidden'}
                variants={scaleIn}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                      <MapPin className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Interactive Map
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Beliani Annex, Ground Floor, Along Kangundo Road, Nairobi
                    </p>
                    <motion.a
                      href="https://maps.app.goo.gl/sYV3vWHF6VxXPLSH8?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                          : item.title === 'Phone Numbers'
                          ? `tel:${line.replace(/\s/g, '')}`
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors focus-visible-ring"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View on Google Maps
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </ParallaxSection>

        {/* FAQ Section */}
        <section
          ref={faqRef}
          className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={faqInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Quick answers to common questions about our services
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={faqInView ? 'visible' : 'hidden'}
            >
              {[
                {
                  question: 'How quickly can you fill a position?',
                  answer:
                    'Depending on the role complexity, we typically fill positions within 2-4 weeks. For urgent requirements, we can provide temporary solutions within 24-48 hours.',
                },
                {
                  question: 'Do you provide services outside Nairobi?',
                  answer:
                    'Yes, we provide services across Kenya and have successfully placed candidates in various counties including Mombasa, Kisumu, Nakuru, and other major towns.',
                },
                {
                  question: 'What industries do you specialize in?',
                  answer:
                    'We serve diverse industries including manufacturing, hospitality, healthcare, finance, construction, retail, and technology sectors.',
                },
                {
                  question: 'What are your service fees?',
                  answer:
                    'Our fees vary based on the service type and complexity. We offer competitive rates and flexible payment terms. Contact us for a customized quote.',
                },
                {
                  question: 'Do you offer guarantees on placements?',
                  answer:
                    'Yes, we provide replacement guarantees for permanent placements. Terms vary by position level and are outlined in our service agreement.',
                },
                {
                  question: 'Can you handle bulk recruitment?',
                  answer:
                    'Absolutely! We specialize in mass recruitment and have successfully handled projects requiring 50+ candidates simultaneously.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                    className="bg-green-600 dark:bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-block focus-visible-ring"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors focus-visible-ring"
                    whileHover={{ color: '#059669' }}
                  >
                    {faq.question}
                  </motion.h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
