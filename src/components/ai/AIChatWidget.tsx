import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MessageCircle,
  X,
  Send,
  ExternalLink,
  Lightbulb,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import SuggestArticleModal from './SuggestArticleModal';

interface QAResponse {
  answer: string;
  sources: Array<{
    title: string;
    content: string;
    url: string;
    similarity: number;
  }>;
  confidence: number;
}

const querySchema = z.object({
  query: z.string().min(3, 'Question must be at least 3 characters'),
});

type QueryFormData = z.infer<typeof querySchema>;

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<QAResponse | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QueryFormData>({
    resolver: zodResolver(querySchema),
  });

  const onSubmit = async (data: QueryFormData) => {
    setIsLoading(true);
    setResponse(null);

    try {
      // First, check if this is a FAQ-type query
      const faqResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/qa`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: data.query }),
      });

      if (!faqResponse.ok) {
        throw new Error('Failed to get response');
      }

      const result: QAResponse = await faqResponse.json();
      
      // If confidence is too low, suggest live support instead
      if (result.confidence < 0.6) {
        setResponse({
          answer: `I don't have enough specific information to answer that question confidently. For the best assistance with "${data.query}", I'd recommend connecting with our live support team who can provide personalized help.\n\nYou can reach us at:\n📞 +254 722 311 490\n📧 info@jaylineservice.co.ke\n\nOur team is available Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 2:00 PM.`,
          sources: [],
          confidence: 0.0,
        });
      } else {
        setResponse(result);
        setShowSources(result.sources.length > 0);
      }
    } catch (error) {
      console.error('Error querying AI:', error);
      setResponse({
        answer: 'Sorry, I encountered an error. Please contact our live support team directly at +254 722 311 490 or info@jaylineservice.co.ke for immediate assistance.',
        sources: [],
        confidence: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 dark:text-green-400';
    if (confidence >= 0.6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center z-40 focus-visible-ring"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI chat assistant"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 500 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Panel */}
            <motion.div
              className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="bg-green-600 dark:bg-green-700 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-green-700 dark:hover:bg-green-600 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 max-h-96 overflow-y-auto">
                {!response && !isLoading && (
                  <div className="text-center text-gray-600 dark:text-gray-400 mb-4">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-green-600 dark:text-green-400" />
                    <p className="text-sm">
                      Ask me about our HR services, recruitment, or business solutions!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      For complex queries, I'll connect you with live support.
                    </p>
                  </div>
                )}

                {/* Response */}
                {response && (
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Answer */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                        {response.answer}
                      </p>
                    </div>

                    {/* Confidence */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-xs">
                        <span className="text-gray-500 dark:text-gray-400 mr-2">
                          Confidence:
                        </span>
                        <span className={`font-semibold ${getConfidenceColor(response.confidence)}`}>
                          {getConfidenceLabel(response.confidence)} ({Math.round(response.confidence * 100)}%)
                        </span>
                      </div>
                      
                      {response.sources.length > 0 && (
                        <button
                          onClick={() => setShowSources(!showSources)}
                          className="flex items-center text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                          Sources ({response.sources.length})
                          {showSources ? (
                            <ChevronUp className="w-3 h-3 ml-1" />
                          ) : (
                            <ChevronDown className="w-3 h-3 ml-1" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Sources */}
                    <AnimatePresence>
                      {showSources && response.sources.length > 0 && (
                        <motion.div
                          className="space-y-2 mb-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          {response.sources.map((source, index) => (
                            <motion.div
                              key={index}
                              className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-green-800 dark:text-green-300 mb-1">
                                    [{index + 1}] {source.title}
                                  </p>
                                  <p className="text-green-700 dark:text-green-400 line-clamp-2">
                                    {source.content}
                                  </p>
                                </div>
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                                  aria-label={`View source: ${source.title}`}
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Suggest Article Button */}
                    {response.confidence > 0.3 && (
                      <motion.button
                        onClick={() => setShowSuggestModal(true)}
                        className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-2 rounded-lg text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Suggest Article Update
                      </motion.button>
                    )}
                    
                    {response.confidence <= 0.3 && (
                      <motion.a
                        href="tel:+254722311490"
                        className="w-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-2 rounded-lg text-xs font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        📞 Call Live Support
                      </motion.a>
                    )}
                  </motion.div>
                )}

                {/* Loading */}
                {isLoading && (
                  <motion.div
                    className="flex items-center justify-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-6 h-6 animate-spin text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Thinking...
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <textarea
                      {...register('query')}
                      placeholder="Ask about our HR services, recruitment, or business solutions..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring text-sm resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      rows={2}
                      disabled={isLoading}
                    />
                    {errors.query && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {errors.query.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-green-600 dark:bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-1" />
                          Ask
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        reset();
                        setResponse(null);
                        setShowSources(false);
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm focus-visible-ring"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Suggest Article Modal */}
      <SuggestArticleModal
        isOpen={showSuggestModal}
        onClose={() => setShowSuggestModal(false)}
        sources={response?.sources || []}
        originalQuery={response ? '' : ''}
      />
    </>
  );
};

export default AIChatWidget;