import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Lightbulb,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';

import SEO from '../../lib/seo';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';

interface Suggestion {
  id: string;
  question: string;
  suggested_title: string;
  suggested_content: string;
  source_urls: string[];
  confidence: number;
  status: string;
  created_by: string;
  created_at: string;
}

interface PaginationInfo {
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

const AdminSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    limit: 10,
    offset: 0,
    hasMore: false,
  });

  const fetchSuggestions = async (offset = 0) => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-suggestions?status=pending&limit=${pagination.limit}&offset=${offset}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionAction = async (suggestionId: string, action: 'accept' | 'reject') => {
    try {
      setProcessingId(suggestionId);
      setError(null);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/accept-suggestion`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          suggestionId,
          action,
          reviewedBy: 'admin',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} suggestion`);
      }

      // Remove processed suggestion from list
      setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
      
      // Show success message
      const actionText = action === 'accept' ? 'accepted and converted to draft' : 'rejected';
      alert(`Suggestion ${actionText} successfully!`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${action} suggestion`);
    } finally {
      setProcessingId(null);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <>
      <SEO
        title="Admin - Article Suggestions"
        description="Review and manage AI-generated article suggestions for Jay Line Services blog."
      />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Article Suggestions
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Review AI-generated content suggestions from users
                </p>
              </div>
              <motion.button
                onClick={() => fetchSuggestions(0)}
                className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center focus-visible-ring"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </motion.button>
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
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pagination.total}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Pending Suggestions
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
                    {suggestions.filter(s => s.confidence >= 0.7).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    High Confidence
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
              variants={scaleIn}
            >
              <div className="flex items-center">
                <Lightbulb className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {suggestions.filter(s => s.source_urls && s.source_urls.length > 0).length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    With Sources
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Suggestions List */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-green-600 dark:text-green-400 mr-3" />
              <span className="text-gray-600 dark:text-gray-300">Loading suggestions...</span>
            </div>
          ) : suggestions.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No pending suggestions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                All suggestions have been reviewed or no new suggestions have been submitted.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                            {getConfidenceLabel(suggestion.confidence)} ({Math.round(suggestion.confidence * 100)}%)
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs ml-3">
                            {new Date(suggestion.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {suggestion.suggested_title}
                        </h3>
                        {suggestion.question && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <strong>Original Question:</strong> {suggestion.question}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
                        className="ml-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus-visible-ring"
                        aria-label={expandedId === suggestion.id ? 'Collapse details' : 'Expand details'}
                      >
                        {expandedId === suggestion.id ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {expandedId === suggestion.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
                          {/* Content Preview */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                              Suggested Content:
                            </h4>
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 max-h-64 overflow-y-auto">
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                {suggestion.suggested_content.split('\n').map((paragraph, idx) => (
                                  <p key={idx} className="mb-2 last:mb-0">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Sources */}
                          {suggestion.source_urls && suggestion.source_urls.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                Sources ({suggestion.source_urls.length}):
                              </h4>
                              <div className="space-y-2">
                                {suggestion.source_urls.map((url, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                                  >
                                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                                      {url}
                                    </span>
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                                      aria-label={`Open source ${idx + 1}`}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                              <strong>Created by:</strong> {suggestion.created_by}
                            </div>
                            <div>
                              <strong>Submitted:</strong> {new Date(suggestion.created_at).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-700/30 flex gap-3">
                    <motion.button
                      onClick={() => handleSuggestionAction(suggestion.id, 'accept')}
                      disabled={processingId === suggestion.id}
                      className="flex-1 bg-green-600 dark:bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {processingId === suggestion.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept as Draft
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => handleSuggestionAction(suggestion.id, 'reject')}
                      disabled={processingId === suggestion.id}
                      className="flex-1 bg-red-600 dark:bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {processingId === suggestion.id ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-2">
                <motion.button
                  onClick={() => fetchSuggestions(Math.max(0, pagination.offset - pagination.limit))}
                  disabled={pagination.offset === 0 || loading}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Previous
                </motion.button>
                <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                  {pagination.offset + 1}-{Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
                </span>
                <motion.button
                  onClick={() => fetchSuggestions(pagination.offset + pagination.limit)}
                  disabled={!pagination.hasMore || loading}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible-ring"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSuggestions;