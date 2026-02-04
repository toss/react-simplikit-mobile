import { useMemo } from 'react';

// =============================================================================
// Types
// =============================================================================

type Platform = {
  os: 'ios' | 'android' | 'other';
  isIOS: boolean;
  isAndroid: boolean;
  isMobile: boolean;
};

// =============================================================================
// Static Platform Detection (for SSR)
// =============================================================================

export const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
export const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
export const isMobile = isIOS || isAndroid;

// =============================================================================
// Hook
// =============================================================================

/**
 * Detects the current platform (iOS/Android/Other)
 * Used for platform-specific keyboard handling
 */
export function usePlatform(): Platform {
  return useMemo(() => {
    if (typeof navigator === 'undefined') {
      return { os: 'other', isIOS: false, isAndroid: false, isMobile: false };
    }

    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroidDevice = /Android/i.test(userAgent);

    return {
      os: isIOSDevice ? 'ios' : isAndroidDevice ? 'android' : 'other',
      isIOS: isIOSDevice,
      isAndroid: isAndroidDevice,
      isMobile: isIOSDevice || isAndroidDevice,
    };
  }, []);
}
