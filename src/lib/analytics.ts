// Analytics utility for Plausible or Google Analytics
declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number> }
    ) => void;
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsProvider = 'plausible' | 'google' | 'none';

class Analytics {
  private provider: AnalyticsProvider = 'none';

  init(provider: AnalyticsProvider = 'plausible') {
    this.provider = provider;

    if (provider === 'plausible') {
      this.initPlausible();
    } else if (provider === 'google') {
      this.initGoogleAnalytics();
    }
  }

  private initPlausible() {
    // Plausible script is loaded via HTML head
    console.log('Plausible Analytics initialized');
  }

  private initGoogleAnalytics() {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    if (!GA_MEASUREMENT_ID) {
      console.warn('Google Analytics Measurement ID not found');
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      (window as any).dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  trackEvent(eventName: string, properties?: Record<string, string | number>) {
    if (this.provider === 'plausible' && window.plausible) {
      window.plausible(eventName, { props: properties });
    } else if (this.provider === 'google' && window.gtag) {
      window.gtag('event', eventName, properties);
    }
  }

  trackPageView(path: string) {
    if (this.provider === 'plausible' && window.plausible) {
      window.plausible('pageview', { props: { path } });
    } else if (this.provider === 'google' && window.gtag) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: path,
      });
    }
  }
}

export const analytics = new Analytics();

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
  };
};
