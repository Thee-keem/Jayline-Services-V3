import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Header, Footer } from '../components/layout';
import { ScrollProgress } from '../components/ui';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors focus-visible-ring"
      >
        Try again
      </button>
    </div>
  </div>
);

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ScrollProgress />
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default MainLayout;