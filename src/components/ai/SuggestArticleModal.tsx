import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Lightbulb, Send, CheckCircle, AlertCircle } from 'lucide-react';

import { supabase } from '../../lib/supabase';

interface Source {
  title: string;
  content: string;
  url: string;
  similarity: number;
}

interface SuggestArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sources: Source[];
  originalQuery: string;
}

const suggestionSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  reasoning: z.string().min(20, 'Please explain why this article would be helpful'),
});

type SuggestionFormData = z.infer<typeof suggestionSchema>;

const SuggestArticleModal: React.FC<SuggestArticleModalProps> = ({
  isOpen,
  onClose,
  sources,
  originalQuery,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SuggestionFormData>({
    resolver: zodResolver(suggestionSchema),
  });

  const onSubmit = async (data: SuggestionFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase.from('suggestions').insert([
        {
          title: data.title,
          content: `${data.content}\n\n---\n\nReasoning: ${data.reasoning}`,
          sources: sources.map(source => ({
            title: source.title,
            url: source.url,
            similarity: source.similarity,
          })),
          status: 'pending',
        },
      ]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      reset();
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to submit suggestion'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitError(null);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-blue-600 dark:bg-blue-700 text-white p-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Lightbulb className="w-6 h-6 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold">Suggest Article Update</h2>
                    <p className="text-blue-100 dark:text-blue-200 text-sm">
                      Help improve our content
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-blue-700 dark:hover:bg-blue-600 rounded transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your article suggestion has been submitted for review.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {submitError && (
                      <motion.div
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-red-700 dark:text-red-300">
                          {submitError}
                        </span>
                      </motion.div>
                    )}

                    <div className="mb-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Based on your question and our current content, you can suggest improvements or new articles that would be helpful.
                      </p>
                      
                      {sources.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Related Sources Found:
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {sources.slice(0, 3).map((source, index) => (
                              <li key={index}>
                                • {source.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Suggested Article Title *
                        </label>
                        <input
                          {...register('title')}
                          type="text"
                          id="title"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="e.g., Complete Guide to Remote Work HR Policies in Kenya"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.title.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Article Content/Outline *
                        </label>
                        <textarea
                          {...register('content')}
                          id="content"
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="Provide a detailed outline or draft content for the suggested article..."
                        />
                        {errors.content && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.content.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="reasoning"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Why would this article be helpful? *
                        </label>
                        <textarea
                          {...register('reasoning')}
                          id="reasoning"
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-visible-ring resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="Explain how this article would help visitors and improve the site..."
                        />
                        {errors.reasoning && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.reasoning.message}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          type="button"
                          onClick={handleClose}
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible-ring"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center focus-visible-ring"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="flex items-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              Submitting...
                            </motion.div>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Submit Suggestion
                            </>
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuggestArticleModal;