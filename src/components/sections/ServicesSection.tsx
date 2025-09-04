import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, ArrowRight } from 'lucide-react';

import { fadeInUp, scaleIn, staggerContainer } from '../../utils/animations';

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
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
          animate="visible"
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
              className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
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