import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';

import SEO from '../lib/seo';
import { fadeInUp, staggerContainer } from '../utils/animations';

// Mock blog post data - replace with CMS integration
const getBlogPost = (slug: string) => {
  const posts = {
    'future-hr-kenya-2024': {
      id: '1',
      title: 'The Future of HR in Kenya: Trends and Predictions for 2024',
      slug: 'future-hr-kenya-2024',
      excerpt:
        'Explore the emerging trends shaping the human resource landscape in Kenya and how businesses can prepare for the future of work.',
      content: `
        <p>The human resource landscape in Kenya is rapidly evolving, driven by technological advancements, changing workforce expectations, and global economic shifts. As we move through 2024, several key trends are reshaping how organizations approach talent management and employee engagement.</p>
        
        <h2>Digital Transformation in HR</h2>
        <p>Kenyan companies are increasingly adopting HR technology solutions to streamline processes and improve employee experiences. From AI-powered recruitment tools to cloud-based HRIS systems, digital transformation is no longer optional but essential for competitive advantage.</p>
        
        <h2>Remote and Hybrid Work Models</h2>
        <p>The pandemic has permanently altered work arrangements in Kenya. Organizations are now implementing flexible work policies that balance productivity with employee well-being, leading to new challenges in performance management and team collaboration.</p>
        
        <h2>Focus on Employee Well-being</h2>
        <p>Mental health and work-life balance have become top priorities for Kenyan employers. Companies are investing in wellness programs, flexible benefits, and supportive work environments to attract and retain talent.</p>
        
        <h2>Skills Development and Continuous Learning</h2>
        <p>With rapid technological change, continuous learning has become crucial. Organizations are partnering with training providers to upskill their workforce and prepare for future industry demands.</p>
      `,
      author: 'John Mwangi',
      publishedAt: '2024-01-15',
      tags: ['HR Trends', 'Kenya', 'Future of Work'],
      readTime: '5 min read',
    },
  };

  return posts[slug as keyof typeof posts] || null;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug || '');

  if (!post) {
    return (
      <>
        <SEO
          title="Post Not Found"
          description="The requested blog post could not be found."
        />
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <Link
              to="/blog"
              className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        keywords={post.tags}
      />

      <article className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Article Header */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 mb-8 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                variants={fadeInUp}
              >
                {post.title}
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8"
                variants={fadeInUp}
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{post.readTime}</span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                variants={fadeInUp}
              >
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="prose prose-lg dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Related Posts CTA */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
                variants={fadeInUp}
              >
                Explore More Insights
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                variants={fadeInUp}
              >
                Discover more expert insights and industry knowledge
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/blog"
                  className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
                >
                  View All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </article>
    </>
  );
};

export default BlogPost;