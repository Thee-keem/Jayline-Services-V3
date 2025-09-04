import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

import { submitContactForm } from '../../lib/supabase';
import { ContactFormData } from '../../types';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitError(null);
      await submitContactForm(data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to send message'
      );
    }
  };

  return (
    <div className={className}>
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 flex items-center"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
            >
              <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            </motion.div>
            <span className="text-green-700 dark:text-green-300">
              Thank you! Your message has been sent successfully.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {submitError && (
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <span className="text-red-700 dark:text-red-300">
              {submitError}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeInUp}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name *
            </label>
            <motion.input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Your full name"
              whileFocus={{ scale: 1.02 }}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-required="true"
            />
            {errors.name && (
              <p
                id="name-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.name.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address *
            </label>
            <motion.input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="your@email.com"
              whileFocus={{ scale: 1.02 }}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-required="true"
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors.email.message}
              </p>
            )}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeInUp}>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone Number
            </label>
            <motion.input
              {...register('phone')}
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="+254 XXX XXX XXX"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Company Name
            </label>
            <motion.input
              {...register('company')}
              type="text"
              id="company"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              placeholder="Your company name"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
        </div>

        <motion.div variants={fadeInUp}>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Service of Interest
          </label>
          <motion.select
            {...register('service')}
            id="service"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            whileFocus={{ scale: 1.02 }}
          >
            <option value="">Select a service</option>
            <option value="recruitment">Staff Recruitment</option>
            <option value="manpower">Manpower Supply</option>
            <option value="hr-consulting">HR Consulting</option>
            <option value="payroll">Payroll Management</option>
            <option value="executive-search">Executive Search</option>
            <option value="training">Training & Development</option>
            <option value="financing">Soft Financing</option>
            <option value="other">Other</option>
          </motion.select>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Message *
          </label>
          <motion.textarea
            {...register('message')}
            id="message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring transition-all resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Tell us about your requirements..."
            whileFocus={{ scale: 1.02 }}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-required="true"
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-1 text-sm text-red-600 dark:text-red-400"
            >
              {errors.message.message}
            </p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus-visible-ring"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-describedby="form-submit-help"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Sending...
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                Send Message
                <Send className="w-5 h-5 ml-2" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        
        <p id="form-submit-help" className="sr-only">
          Submit the contact form to send your message to Jay Line Services
        </p>
      </motion.form>
    </div>
  );
};

export default ContactForm;
