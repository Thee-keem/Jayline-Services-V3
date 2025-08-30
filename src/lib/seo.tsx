import React from 'react';
import { Helmet } from 'react-helmet-async';

import { SEOData } from '../types';

interface SEOProps extends SEOData {
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url = 'https://jaylineservice.co.ke',
  type = 'website',
  children,
}) => {
  const fullTitle = title.includes('Jay Line Services')
    ? title
    : `${title} | Jay Line Services`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Jay Line Services" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Jay Line Services" />
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Jay Line Services',
          description: 'Leading HR and manpower solutions provider in Kenya',
          url: 'https://jaylineservice.co.ke',
          logo: 'https://jaylineservice.co.ke/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+254-722-311-490',
            contactType: 'customer service',
            areaServed: 'KE',
            availableLanguage: ['English', 'Swahili'],
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Beliani Annex, Ground Floor, Along Kangundo Road',
            addressLocality: 'Nairobi',
            postalCode: '00100',
            addressCountry: 'KE',
          },
          sameAs: [
            'https://facebook.com/jaylineservices',
            'https://linkedin.com/company/jaylineservices',
          ],
        })}
      </script>

      {children}
    </Helmet>
  );
};

export default SEO;
