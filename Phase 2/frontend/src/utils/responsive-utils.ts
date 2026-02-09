// Responsive utility functions for handling different screen sizes

/**
 * Check if the current viewport is mobile size
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Check if the current viewport is tablet size
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if the current viewport is desktop size
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

/**
 * Get the current breakpoint name
 */
export const getCurrentBreakpoint = (): 'mobile' | 'tablet' | 'desktop' => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

/**
 * Hook to track window size changes
 */
export const useWindowSize = () => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

/**
 * Hook to track current breakpoint
 */
export const useBreakpoint = () => {
  const { width } = useWindowSize();

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Import React for hooks
import React from 'react';
