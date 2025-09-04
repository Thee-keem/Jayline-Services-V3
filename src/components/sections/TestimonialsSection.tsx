import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fadeInUp, scaleIn, staggerContainer } from '../../utils/animations';

const TestimonialsSection: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Wanjiku',
      position: 'HR Director',
      company: 'TechCorp Kenya',
      content: 'Jay Line Services transformed our recruitment process. Their expertise in finding the right talent has been invaluable to our growth. We\'ve reduced our hiring time by 60% and improved candidate quality significantly.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Ochieng',
      position: 'Operations Manager',
      company: 'Manufacturing Plus Ltd',
      content: 'The manpower solutions provided by Jay Line Services have been exceptional. Their team understands our industry needs and consistently delivers skilled workers who integrate seamlessly into our operations.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Grace Mutindi',
      position: 'CEO',
      company: 'Retail Solutions Kenya',
      content: 'Working with Jay Line Services for our payroll management has been a game-changer. Their accuracy, timeliness, and professional support have allowed us to focus on growing our business.',
      rating: 5,
    },
    {
      id: 4,
      name: 'James Kiprop',
      position: 'Finance Director',
      company: 'Construction Dynamics',
      content: 'The soft financing solutions from Jay Line Services came at the perfect time for our expansion. Their flexible terms and quick approval process helped us seize a major business opportunity.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Mary Njeri',
      position: 'General Manager',
      company: 'Hospitality Excellence',
      content: 'Jay Line Services has been our trusted partner for over 5 years. Their comprehensive HR solutions and dedicated support team have been instrumental in our success across multiple locations.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Peter Mwangi',
      position: 'Head of Operations',
      company: 'Logistics Pro Kenya',
      content: 'The executive search services exceeded our expectations. Jay Line Services found us the perfect candidates for senior positions, and their thorough vetting process ensured excellent cultural fit.',
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped transform
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              variants={scaleIn}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <Quote className="w-8 h-8 text-green-500 mr-3 opacity-50" />
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </motion.div>

              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                whileHover={{ scale: 1.01 }}
              >
                "{testimonial.content}"
              </motion.p>

              <motion.div
                className="border-t border-gray-200 dark:border-gray-700 pt-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.position}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {testimonial.company}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate={isIntersecting ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
            >
              Join Our Happy Clients
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;