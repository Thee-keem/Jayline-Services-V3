import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Tag, ArrowRight, Share2 } from 'lucide-react';

import SEO from '../lib/seo';
import { fadeInUp, staggerContainer } from '../utils/animations';

// Mock blog post data - replace with CMS integration or Supabase
const getBlogPost = (slug: string) => {
  const posts = {
    'future-hr-kenya-2024': {
      id: '1',
      title: 'The Future of HR in Kenya: Trends and Predictions for 2024',
      slug: 'future-hr-kenya-2024',
      excerpt:
        'Explore the emerging trends shaping the human resource landscape in Kenya and how businesses can prepare for the future of work.',
      content: `
        <p class="text-lg leading-relaxed mb-6">The human resource landscape in Kenya is rapidly evolving, driven by technological advancements, changing workforce expectations, and global economic shifts. As we move through 2024, several key trends are reshaping how organizations approach talent management and employee engagement.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Digital Transformation in HR</h2>
        <p class="leading-relaxed mb-6">Kenyan companies are increasingly adopting HR technology solutions to streamline processes and improve employee experiences. From AI-powered recruitment tools to cloud-based HRIS systems, digital transformation is no longer optional but essential for competitive advantage.</p>
        
        <p class="leading-relaxed mb-6">Key areas of digital transformation include:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Automated recruitment and applicant tracking systems</li>
          <li>Digital onboarding and employee self-service portals</li>
          <li>Performance management platforms with real-time feedback</li>
          <li>AI-driven analytics for workforce planning and retention</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Remote and Hybrid Work Models</h2>
        <p class="leading-relaxed mb-6">The pandemic has permanently altered work arrangements in Kenya. Organizations are now implementing flexible work policies that balance productivity with employee well-being, leading to new challenges in performance management and team collaboration.</p>
        
        <p class="leading-relaxed mb-6">Companies are investing in:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Collaboration tools and digital workspace platforms</li>
          <li>Virtual team building and engagement programs</li>
          <li>Flexible work policy frameworks</li>
          <li>Remote performance monitoring systems</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Focus on Employee Well-being</h2>
        <p class="leading-relaxed mb-6">Mental health and work-life balance have become top priorities for Kenyan employers. Companies are investing in wellness programs, flexible benefits, and supportive work environments to attract and retain talent.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Skills Development and Continuous Learning</h2>
        <p class="leading-relaxed mb-6">With rapid technological change, continuous learning has become crucial. Organizations are partnering with training providers to upskill their workforce and prepare for future industry demands.</p>
        
        <div class="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 my-8">
          <h3 class="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Key Takeaway</h3>
          <p class="text-green-700 dark:text-green-400">The future of HR in Kenya lies in embracing technology while maintaining the human touch that makes great workplaces. Organizations that invest in digital transformation, employee well-being, and continuous learning will be best positioned for success.</p>
        </div>
      `,
      author: 'John Mwangi',
      publishedAt: '2024-01-15',
      tags: ['HR Trends', 'Kenya', 'Future of Work', 'Digital Transformation'],
      readTime: '5 min read',
      category: 'HR Trends',
    },
    'recruitment-strategies-kenyan-smes': {
      id: '2',
      title: 'Effective Recruitment Strategies for Kenyan SMEs',
      slug: 'recruitment-strategies-kenyan-smes',
      excerpt:
        'Learn proven recruitment strategies that help small and medium enterprises in Kenya attract and retain top talent.',
      content: `
        <p class="text-lg leading-relaxed mb-6">Small and medium enterprises (SMEs) in Kenya face unique challenges when it comes to recruitment. Limited budgets, competition with larger corporations, and the need for versatile employees require strategic approaches to talent acquisition.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Understanding the SME Recruitment Landscape</h2>
        <p class="leading-relaxed mb-6">SMEs often struggle with recruitment due to resource constraints and limited brand recognition. However, they also offer unique advantages such as career growth opportunities, diverse responsibilities, and closer team relationships.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Cost-Effective Recruitment Strategies</h2>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Leverage social media and professional networks</li>
          <li>Implement employee referral programs</li>
          <li>Partner with local universities and training institutions</li>
          <li>Use free job posting platforms effectively</li>
          <li>Build a strong employer brand online</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Retention Strategies</h2>
        <p class="leading-relaxed mb-6">Attracting talent is only half the battle. SMEs must focus on retention through competitive compensation packages, professional development opportunities, and positive work culture.</p>
      `,
      author: 'Sarah Wanjiku',
      publishedAt: '2024-01-10',
      tags: ['Recruitment', 'SMEs', 'Talent Acquisition', 'Strategy'],
      readTime: '7 min read',
      category: 'Recruitment',
    },
    'kenya-labor-laws-guide': {
      id: '3',
      title: 'Navigating Labor Laws in Kenya: A Complete Guide',
      slug: 'kenya-labor-laws-guide',
      excerpt:
        'A comprehensive guide to understanding and complying with Kenyan labor laws for employers and HR professionals.',
      content: `
        <p class="text-lg leading-relaxed mb-6">Understanding and complying with Kenyan labor laws is crucial for any business operating in the country. This comprehensive guide covers the essential aspects of employment law that every employer should know.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Employment Act 2007</h2>
        <p class="leading-relaxed mb-6">The Employment Act 2007 is the primary legislation governing employment relationships in Kenya. It covers various aspects including contracts, working hours, leave entitlements, and termination procedures.</p>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Key Compliance Areas</h2>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Employment contracts and terms of service</li>
          <li>Working hours and overtime regulations</li>
          <li>Leave entitlements and public holidays</li>
          <li>Termination procedures and severance pay</li>
          <li>Health and safety requirements</li>
          <li>Non-discrimination and equal opportunity</li>
        </ul>
        
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Recent Updates and Changes</h2>
        <p class="leading-relaxed mb-6">Stay informed about recent amendments to labor laws and their implications for your business operations.</p>
      `,
      author: 'David Kiprotich',
      publishedAt: '2024-01-05',
      tags: ['Labor Laws', 'Compliance', 'Legal', 'Employment'],
      readTime: '10 min read',
      category: 'Legal',
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

  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
        keywords={post.tags}
        url={shareUrl}
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

              <motion.div
                className="flex items-center mb-6"
                variants={fadeInUp}
              >
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                variants={fadeInUp}
              >
                {post.title}
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                variants={fadeInUp}
              >
                {post.excerpt}
              </motion.p>

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
                <motion.button
                  onClick={handleShare}
                  className="flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </motion.button>
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
              className="prose prose-lg dark:prose-invert max-w-none prose-green"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <motion.div
              className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {post.author}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    HR Expert & Consultant at Jay Line Services
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Share */}
            <motion.div
              className="mt-8 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={handleShare}
                className="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share This Article
              </motion.button>
            </motion.div>
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
                Discover more expert insights and industry knowledge from our team
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/blog"
                    className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center"
                  >
                    View All Articles
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="border-2 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors inline-flex items-center"
                  >
                    Get Expert Consultation
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </article>
    </>
  );
};

export default BlogPost;