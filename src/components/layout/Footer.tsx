import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const Footer = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  const navigationItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/jaylineservices', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/jaylineservices', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/jaylineservices', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/jaylineservices', label: 'Instagram' },
  ];

  return (
    <motion.footer
      ref={ref}
      className="bg-green-900 dark:bg-gray-900 text-white transition-colors duration-300"
      initial="hidden"
      animate={isIntersecting ? 'visible' : 'hidden'}
      variants={staggerContainer}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div className="md:col-span-2" variants={fadeInUp}>
            <motion.div
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mr-3"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-white font-bold" aria-hidden="true">
                  JL
                </span>
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Jay Line Services</h3>
                <p className="text-green-300 dark:text-green-400 text-sm italic">
                  Your Partner in Progress
                </p>
              </div>
            </motion.div>
            <p className="text-green-100 dark:text-gray-300 mb-6 leading-relaxed">
              Jay Line Services is a leading provider of comprehensive human resource solutions, manpower services, and financial consultancy in Kenya.
            </p>
            <div
              className="flex space-x-4"
              role="list"
              aria-label="Social media links"
            >
              {socialLinks.map(({ icon: Icon, href, label }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-green-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors focus-visible-ring"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Follow us on ${label}`}
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-4 text-green-300 dark:text-green-400">
              Quick Links
            </h4>
            <nav role="navigation" aria-label="Footer navigation">
              <ul className="space-y-2">
                {navigationItems.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }}>
                    <Link
                      to={link.to}
                      className="text-green-100 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-semibold mb-4 text-green-300 dark:text-green-400">
              Contact Info
            </h4>
            <address className="space-y-3 not-italic">
              <motion.div className="flex items-start" whileHover={{ x: 5 }}>
                <MapPin
                  className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="text-green-100 dark:text-gray-300 text-sm">
                  <p>Beliani Annex, Ground Floor</p>
                  <p>Along Kangundo Road</p>
                  <p>P.O. Box 5322-00100, Nairobi</p>
                </div>
              </motion.div>

              <motion.div className="flex items-center" whileHover={{ x: 5 }}>
                <Phone
                  className="w-5 h-5 text-green-400 mr-3"
                  aria-hidden="true"
                />
                <div className="text-green-100 dark:text-gray-300 text-sm">
                  <p>
                    <a
                      href="tel:+254722311490"
                      className="hover:text-white transition-colors"
                    >
                      +254 722 311 490
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:+254734271863"
                      className="hover:text-white transition-colors"
                    >
                      +254 734 271 863
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-center" whileHover={{ x: 5 }}>
                <Mail
                  className="w-5 h-5 text-green-400 mr-3"
                  aria-hidden="true"
                />
                <motion.a
                  href="mailto:info@jaylineservice.co.ke"
                  className="text-green-100 dark:text-gray-300 hover:text-white transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  info@jaylineservice.co.ke
                </motion.a>
              </motion.div>

              <motion.div className="flex items-center" whileHover={{ x: 5 }}>
                <Globe
                  className="w-5 h-5 text-green-400 mr-3"
                  aria-hidden="true"
                />
                <motion.a
                  href="https://jaylineservice.co.ke"
                  className="text-green-100 dark:text-gray-300 hover:text-white transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  jaylineservice.co.ke
                </motion.a>
              </motion.div>
            </address>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-green-800 dark:border-gray-700 mt-8 pt-8 text-center"
          variants={fadeInUp}
        >
          <p className="text-green-200 dark:text-gray-400 text-sm">
            &copy; 2024 Jay Line Services. All rights reserved. | Privacy Policy
            | Terms of Service
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
