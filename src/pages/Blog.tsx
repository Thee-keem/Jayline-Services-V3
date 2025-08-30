import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

import SEO from '../lib/seo';
import { AnimatedText, FloatingElements } from '../components/ui';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animations';

// Mock blog data - replace with CMS integration
const blogPosts = [
  {
    id: '1',
    title: 'The Future of HR in Kenya: Trends and Predictions for 2024',
    slug: 'future-hr-kenya-2024',
    excerpt:
      'Explore the emerging trends shaping the human resource landscape in Kenya and how businesses can prepare for the future of work.',
    author: 'John Mwangi',
    publishedAt: '2024-01-15',
    tags: ['HR Trends', 'Kenya', 'Future of Work'],
    featured: true,
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Effective Recruitment Strategies for Kenyan SMEs',
    slug: 'recruitment-strategies-kenyan-smes',
    excerpt:
      'Learn proven recruitment strategies that help small and medium enterprises in Kenya attract and retain top talent.',
    author: 'Sarah Wanjiku',
    publishedAt: '2024-01-10',
    tags: ['Recruitment', 'SMEs', 'Talent Acquisition'],
    featured: false,
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'Navigating Labor Laws in Kenya: A Complete Guide',
    slug: 'kenya-labor-laws-guide',
    excerpt:
      'A comprehensive guide to understanding and complying with Kenyan labor laws for employers and HR professionals.',
    author: 'David Kiprotich',
    publishedAt: '2024-01-05',
    tags: ['Labor Laws', 'Compliance', 'Legal'],
    featured: false,
    readTime: '10 min read',
  },
];

const Blog = () => {
  const { ref: heroRef, isIntersecting: heroInView } =
    useIntersectionObserver();
  const { ref: postsRef, isIntersecting: postsInView } =
    useIntersectionObserver();

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <SEO
        title="Blog & Insights"
        description="Stay updated with the latest HR trends, recruitment strategies, and business insights from Jay Line Services experts."
        keywords={[
          'HR blog',
          'recruitment insights',
          'Kenya HR trends',
          'manpower solutions',
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
                <AnimatedText
                  text="Blog & Insights"
                  className="text-5xl font-bold mb-6"
                />
              </motion.div>
              <motion.p
                className="text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                Stay updated with the latest HR trends, recruitment strategies,
                and business insights
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial="hidden"
                animate={heroInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Featured Article
                </h2>
                <motion.article
                  className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 lg:p-12 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center space-x-4 text-sm text-green-600 dark:text-green-400 mb-4">
                        <span className="bg-green-600 dark:bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Featured
                        </span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(
                            featuredPost.publishedAt
                          ).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {featuredPost.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {featuredPost.author}
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            to={`/blog/${featuredPost.slug}`}
                            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
                          >
                            Read Article
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-xl p-8 text-center transition-colors duration-300">
                      <div className="w-full h-48 bg-gray-200 dark:bg-gray-500 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">
                          Featured Image
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section ref={postsRef} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate={postsInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Expert insights and industry knowledge from our team
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate={postsInView ? 'visible' : 'hidden'}
            >
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      Article Image
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {post.author}
                        </span>
                      </div>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 flex items-center text-sm"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;