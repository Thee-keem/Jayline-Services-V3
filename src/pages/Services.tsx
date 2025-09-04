import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  TrendingUp,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
} from 'lucide-react';

import SEO from '../lib/seo';
import {
  AnimatedText,
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

const Services = () => {
  const location = useLocation();
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();

  const serviceCategories = [
    {
      id: 'hr-solutions',
      title: 'Human Resource Solutions',
      icon: Users,
      description:
        'Comprehensive HR services to manage your workforce effectively',
      benefits: [
        'Reduce hiring costs by up to 40%',
        'Access to pre-screened talent pool',
        'Compliance with Kenyan labor laws',
        'Streamlined HR processes',
      ],
      services: [
        {
          name: 'Staff Recruitment/Mass Recruitment & Placements (Bulk Recruitment)',
          description:
            'End-to-end recruitment services for single positions to large-scale hiring needs',
          details:
            'Our comprehensive recruitment process includes job analysis, candidate sourcing, screening, interviewing, and onboarding support. We maintain a database of over 10,000 pre-qualified candidates across various industries and skill levels.',
          benefits: [
            'Average placement time: 2-3 weeks',
            '95% candidate retention rate after 6 months',
            'Multi-channel sourcing strategy',
            'Thorough background verification',
          ],
        },
        {
          name: 'General Human Resource Consultancy & Development',
          description:
            'Strategic HR consulting to optimize your human capital management',
          details:
            'We provide expert guidance on HR strategy, policy development, organizational design, and performance management systems. Our consultants help you build efficient HR frameworks that align with your business objectives.',
          benefits: [
            'Customized HR policies and procedures',
            'Improved employee engagement scores',
            'Reduced HR compliance risks',
            'Enhanced organizational efficiency',
          ],
        },
        {
          name: 'Professional Employer Organization',
          description:
            'Complete HR outsourcing solutions for businesses of all sizes',
          details:
            'As your PEO partner, we handle all HR functions including payroll, benefits administration, compliance management, and employee relations, allowing you to focus on core business activities.',
          benefits: [
            'Cost savings of 20-30% on HR operations',
            'Access to enterprise-level benefits',
            'Reduced administrative burden',
            'Expert HR support and guidance',
          ],
        },
        {
          name: 'Outsourced Payroll Management',
          description:
            'Accurate and compliant payroll processing and management services',
          details:
            'Our payroll experts ensure accurate, timely, and compliant payroll processing with detailed reporting, tax calculations, and statutory deductions management.',
          benefits: [
            '100% accuracy guarantee',
            'Timely salary disbursement',
            'Comprehensive payroll reports',
            'Full compliance with KRA requirements',
          ],
        },
      ],
    },
    {
      id: 'manpower-employment-services',
      title: 'Manpower & Employment Services',
      icon: Target,
      description:
        'Flexible workforce solutions tailored to your operational needs',
      benefits: [
        'Flexible workforce scaling',
        'Reduced recruitment overhead',
        'Access to specialized skills',
        'Quick deployment capabilities',
      ],
      services: [
        {
          name: 'Manpower Supply',
          description:
            'Reliable supply of skilled and unskilled workers across various industries',
          details:
            'We provide temporary, contract, and permanent workforce solutions across manufacturing, construction, hospitality, retail, and service industries with workers available within 24-48 hours for urgent needs.',
          benefits: [
            '24-48 hour deployment for urgent needs',
            'Pre-trained and certified workers',
            'Flexible contract terms',
            'Comprehensive worker insurance coverage',
          ],
        },
        {
          name: 'Outsourced Manpower/Labor Management/Employment',
          description:
            'Complete workforce management including supervision and administration',
          details:
            'We take full responsibility for workforce management including supervision, performance monitoring, training, and administrative tasks, ensuring optimal productivity and compliance.',
          benefits: [
            'Professional supervision and management',
            'Reduced management overhead',
            'Performance optimization programs',
            'Complete administrative support',
          ],
        },
        {
          name: 'Executive Search & Head Hunting Services',
          description:
            'Specialized recruitment for senior-level and executive positions',
          details:
            'Our executive search team specializes in identifying and recruiting top-tier talent for C-level, director, and senior management positions across various industries.',
          benefits: [
            'Access to passive candidate networks',
            'Confidential search processes',
            'Comprehensive executive assessment',
            '6-month replacement guarantee',
          ],
        },
      ],
    },
    {
      id: 'financial-advisory-services',
      title: 'Financial & Advisory Services',
      icon: TrendingUp,
      description:
        'Financial solutions and advisory services to support business growth',
      benefits: [
        'Flexible financing terms',
        'Competitive interest rates',
        'Quick approval processes',
        'Business growth support',
      ],
      services: [
        {
          name: 'Soft Financing',
          description:
            'Flexible financing options to support your business expansion and operations',
          details:
            'We offer unsecured business loans, equipment financing, and working capital solutions with flexible repayment terms designed to support SMEs and growing businesses.',
          benefits: [
            'Loans from KES 50,000 to KES 5,000,000',
            'Competitive interest rates from 12% p.a.',
            'Quick approval within 48-72 hours',
            'Flexible repayment periods up to 36 months',
          ],
        },
        {
          name: 'Savings',
          description:
            'Corporate and individual savings programs with competitive returns',
          details:
            'Our savings programs offer attractive returns for both corporate and individual clients with flexible terms and easy access to funds when needed.',
          benefits: [
            'Competitive interest rates up to 8% p.a.',
            'Flexible savings terms',
            'Easy fund access',
            'Professional financial advisory',
          ],
        },
        {
          name: 'Salary Survey',
          description:
            'Comprehensive market salary analysis and benchmarking services',
          details:
            'We conduct detailed salary surveys and market analysis to help organizations establish competitive compensation packages and attract top talent.',
          benefits: [
            'Industry-specific salary benchmarks',
            'Market positioning analysis',
            'Compensation structure recommendations',
            'Annual salary trend reports',
          ],
        },
      ],
    },
    {
      id: 'training-development',
      title: 'Training & Development',
      icon: GraduationCap,
      description:
        'Professional development programs to enhance workforce capabilities',
      benefits: [
        'Improved employee performance',
        'Enhanced skill development',
        'Career advancement opportunities',
        'Increased employee retention',
      ],
      services: [
        {
          name: 'Staff Training & Career Development',
          description:
            'Customized training programs to enhance employee skills and career growth',
          details:
            'We design and deliver tailored training programs covering technical skills, soft skills, leadership development, and industry-specific competencies to enhance workforce capabilities.',
          benefits: [
            'Customized training curricula',
            'Certified professional trainers',
            'Measurable skill improvement',
            'Post-training support and assessment',
          ],
        },
        {
          name: 'Career Counseling',
          description:
            'Professional guidance for career planning and development',
          details:
            'Our career counselors provide personalized guidance to help individuals identify career paths, develop professional skills, and achieve their career objectives.',
          benefits: [
            'Personalized career assessments',
            'Professional development planning',
            'Industry insights and trends',
            'Ongoing mentorship support',
          ],
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Our Services"
        description="Comprehensive HR and manpower solutions including recruitment, payroll management, executive search, training, and financial services in Kenya."
        keywords={[
          'HR services Kenya',
          'manpower solutions',
          'recruitment services',
          'payroll management',
          'executive search',
          'staff training',
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
                <AnimatedText text="Our Services" />
              </h1>
            </motion.div>
            <motion.p
              className="text-xl text-green-100 max-w-3xl mx-auto"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              Comprehensive human resource and manpower solutions designed to
              drive your business success
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete HR & Manpower Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From recruitment to training, financing to consulting - we provide
              end-to-end solutions for all your human resource and business
              needs
            </p>
          </motion.div>

          {/* Service Categories */}
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              id={category.id}
              className="mb-20"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="bg-green-50 dark:bg-gray-800 rounded-2xl p-8 mb-8 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mr-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <category.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                      variants={fadeInUp}
                    >
                      {category.title}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-gray-600 dark:text-gray-300"
                      variants={fadeInUp}
                    >
                      {category.description}
                    </motion.p>
                  </div>
                </div>

                {/* Category Benefits */}
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {category.benefits.map((benefit, benefitIndex) => (
                    <motion.div
                      key={benefitIndex}
                      className="flex items-center text-sm text-green-700 dark:text-green-300 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-300"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      {benefit}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
                    variants={scaleIn}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h4
                      className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {service.name}
                    </motion.h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                    {/* Service Details */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 transition-colors duration-300">
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {service.details}
                      </p>
                    </div>

                    {/* Service Benefits */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Key Benefits:
                      </h5>
                      {service.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                          whileHover={{ x: 3 }}
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Our Services */}
      <ParallaxSection speed={-0.1}>
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We deliver exceptional value through our comprehensive approach
                and commitment to excellence
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  icon: Award,
                  title: 'Proven Expertise',
                  description:
                    '15+ years of experience delivering successful HR and manpower solutions across Kenya',
                },
                {
                  icon: Clock,
                  title: 'Fast Delivery',
                  description:
                    'Quick turnaround times and efficient processes to meet your urgent business needs',
                },
                {
                  icon: Target,
                  title: 'Tailored Solutions',
                  description:
                    'Customized services designed to meet your specific industry and business requirements',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <item.icon className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Service Process */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A streamlined approach to delivering exceptional results
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                step: '1',
                title: 'Consultation',
                description:
                  'We understand your needs and develop a customized solution strategy',
              },
              {
                step: '2',
                title: 'Planning',
                description:
                  'Detailed project planning with clear timelines and deliverables',
              },
              {
                step: '3',
                title: 'Execution',
                description:
                  'Professional implementation with regular progress updates',
              },
              {
                step: '4',
                title: 'Support',
                description:
                  'Ongoing support and optimization to ensure continued success',
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {process.step}
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative py-20 bg-green-600 dark:bg-green-700 text-white overflow-hidden transition-colors duration-300"
      >
        <FloatingElements />
        <div className="max-w-7xl mx-auto px-4 text-center relative">
          <motion.div
            initial="hidden"
            animate="visible"
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
    </div>
    </>
  );
};

export default Services;