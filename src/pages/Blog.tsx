import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock, Tag, Search } from 'lucide-react';

import SEO from '../lib/seo';
import { AnimatedText, FloatingElements } from '../components/ui';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { fadeInUp, staggerContainer, scaleIn } from '../utils/animations';

// Mock blog data - replace with CMS integration or Supabase
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
    category: 'HR Trends',
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
    category: 'Recruitment',
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
    category: 'Legal',
  },
  {
    id: '4',
    title: 'Building a Strong Company Culture in Remote Work Era',
    slug: 'company-culture-remote-work',
    excerpt:
      'Discover strategies for maintaining and building strong company culture while managing remote and hybrid teams.',
    author: 'Mary Njeri',
    publishedAt: '2024-01-01',
    tags: ['Company Culture', 'Remote Work', 'Team Management'],
    featured: false,
    readTime: '6 min read',
    category: 'Culture',
  },
  {
    id: '5',
    title: 'Payroll Management Best Practices for Kenyan Businesses',
    slug: 'payroll-management-best-practices',
    excerpt:
      'Essential payroll management practices to ensure compliance, accuracy, and employee satisfaction in Kenya.',
    author: 'Peter Mwangi',
    publishedAt: '2023-12-28',
    tags: ['Payroll', 'Compliance', 'Best Practices'],
    featured: false,
    readTime: '8 min read',
    category: 'Payroll',
  },
  {
    id: '6',
    title: 'Executive Search: Finding Leadership Talent in Kenya',
    slug: 'executive-search-leadership-talent',
    excerpt:
      'Insights into the executive search process and how to identify and attract top leadership talent in the Kenyan market.',
    author: 'Grace Mutindi',
    publishedAt: '2023-12-20',
    tags: ['Executive Search', 'Leadership', 'Talent'],
    featured: false,
    readTime: '9 min read',
    category: 'Leadership',
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { ref: heroRef, isIntersecting: heroInView } = useIntersectionObserver();
  const { ref: postsRef, isIntersecting: postsInView } = useIntersectionObserver();

  const categories = ['All', 'HR Trends', 'Recruitment', 'Legal', 'Culture', 'Payroll', 'Leadership'];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
                <h1 className="text-5xl font-bold mb-6">
                  <AnimatedText text="Blog & Insights" />
                </h1>
              </motion.div>
              <motion.p
                className="text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                Stay updated with the latest HR trends, recruitment strategies,
                and business insights from our expert team
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              className="flex flex-col md:flex-row gap-6 items-center justify-between"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Search */}
              <motion.div className="relative flex-1 max-w-md" variants={fadeInUp}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  aria-label="Search blog articles"
                />
              </motion.div>

              {/* Category Filter */}
              <motion.div className="flex flex-wrap gap-2" variants={fadeInUp}>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors focus-visible-ring ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                  Featured Article
                </h2>
                <motion.article
                  className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 lg:p-12 transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
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
                          {new Date(featuredPost.publishedAt).toLocaleDateString()}
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
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-white dark:bg-gray-600 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
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
                            className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center focus-visible-ring"
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
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            {filteredPosts.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <motion.button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            ) : (
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
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden">
                      <span className="text-gray-500 dark:text-gray-400">
                        Article Image
                      </span>
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
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
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                            +{post.tags.length - 2} more
                          </span>
                        )}
                      </div>

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
                            className="text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 flex items-center text-sm focus-visible-ring"
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
            )}

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <motion.div
                className="text-center mt-12"
                initial="hidden"
                animate={postsInView ? 'visible' : 'hidden'}
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Placeholder for load more functionality
                    console.log('Load more articles');
                  }}
                >
                  Load More Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-green-600 dark:bg-green-700 text-white transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Stay Updated
              </motion.h2>
              <motion.p
                className="text-xl text-green-100 dark:text-green-200 mb-8"
                variants={fadeInUp}
              >
                Subscribe to our newsletter for the latest HR insights and industry updates
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={fadeInUp}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus-visible-ring"
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;