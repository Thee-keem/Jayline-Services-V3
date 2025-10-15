import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import { useScrollToTop } from './hooks/useScrollToTop';

// Eagerly load Home page for faster initial load
import Home from './pages/Home';
// Lazy load non-critical pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminSuggestions = lazy(() => import('./pages/admin/Suggestions'));
const AdminBlogDrafts = lazy(() => import('./pages/admin/BlogDrafts'));

// Enhanced loading component with skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  useScrollToTop();

  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/suggestions" element={<AdminSuggestions />} />
          <Route path="/admin/blog-drafts" element={<AdminBlogDrafts />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
