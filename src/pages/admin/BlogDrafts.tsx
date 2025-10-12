import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Calendar,
  User,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

import SEO from '../../lib/seo';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  slug: string;
  metadata?: {
    description?: string;
    keywords?: string[];
    category?: string;
    readingTime?: number;
    difficulty?: string;
    scheduledFor?: string;
    generatedAt?: string;
  };
}

const BlogDrafts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [generatingDraft, setGeneratingDraft] = useState(false);

  const fetchDrafts = async () => {
    try {
      setLoading(true);
      setError(null);

      // This would be a real API call to fetch draft posts
      // For now, we'll simulate with empty array
      setPosts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load drafts');
    } finally {
      setLoading(false);
    }
  };

  const generateAIDraft = async () => {
    setGeneratingDraft(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-blog-agent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetAudience: 'HR professionals and business owners in Kenya',
          contentType: 'guide',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate draft');
      }

      const result = await response.json();
      alert(`AI draft "${result.post.title}" created successfully!`);
      fetchDrafts(); // Refresh the list
    } catch (error) {
      console.error('Error generating draft:', error);
      alert('Failed to generate AI draft. Please try again.');
    } finally {
      setGeneratingDraft(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <>
      <SEO
        title="Admin - Blog Drafts"
        description="Manage AI-generated blog drafts and scheduled content for Jay Line Services."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Blog Drafts
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Manage AI-generated content and scheduled posts
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={fetchDrafts}
                  className="bg-gray-600 dark:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors flex items-center focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </motion.button>
                <motion.button
                  onClick={generateAIDraft}
                  className="bg-purple-600 dark:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={generatingDraft}
                >
                  {generatingDraft ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Generate AI Draft
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-4 gap-6 mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {posts.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Total Drafts
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {posts.filter(p => p.created_by === 'ai-agent').length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    AI Generated
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {posts.filter(p => p.metadata?.scheduledFor).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Scheduled
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {posts.filter(p => p.status === 'draft').length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ready for Review
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Drafts List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-green-600 dark:text-green-400 mr-3" />
              <span className="text-gray-600 dark:text-gray-300">Loading drafts...</span>
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No drafts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Generate your first AI blog draft to get started.
              </p>
              <motion.button
                onClick={generateAIDraft}
                className="bg-purple-600 dark:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={generatingDraft}
              >
                {generatingDraft ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-2" />
                )}
                Generate AI Draft
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {post.created_by === 'ai-agent' && (
                            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-medium mr-2">
                              AI Generated
                            </span>
                          )}
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                            {post.status}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs ml-3">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {post.title}
                        </h3>
                        {post.metadata?.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {post.metadata.description}
                          </p>
                        )}
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.created_by}
                          </div>
                          {post.metadata?.readingTime && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.metadata.readingTime} min read
                            </div>
                          )}
                          {post.metadata?.scheduledFor && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Scheduled: {new Date(post.metadata.scheduledFor).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedId(expandedId === post.id ? null : post.id)}
                        className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus-visible-ring"
                        aria-label={expandedId === post.id ? 'Collapse details' : 'Expand details'}
                      >
                        {expandedId === post.id ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedId === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto">
                              <pre className="whitespace-pre-wrap text-sm">
                                {post.content}
                              </pre>
                            </div>
                          </div>
                          
                          {post.metadata?.keywords && (
                            <div className="mt-4">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                Keywords:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {post.metadata.keywords.map((keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-700/30 flex gap-3">
                    <motion.button
                      className="flex-1 bg-green-600 dark:bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review & Publish
                    </motion.button>

                    <motion.button
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDrafts;