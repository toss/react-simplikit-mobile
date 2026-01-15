import { useEffect, useState } from 'react';

import { isServer } from '../../utils/isServer/isServer.ts';

/**
 * Low battery threshold (20%)
 */
const LOW_BATTERY_THRESHOLD = 0.2;

/**
 * Battery manager interface
 */
type BatteryManager = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(type: 'chargingchange' | 'levelchange', listener: () => void): void;
  removeEventListener(type: 'chargingchange' | 'levelchange', listener: () => void): void;
} & EventTarget;

/**
 * Navigator with getBattery method
 */
type NavigatorWithBattery = {
  getBattery?: () => Promise<BatteryManager>;
} & Navigator;

/**
 * NetworkInformation interface for navigator.connection
 */
type NetworkInformation = {
  saveData?: boolean;
  addEventListener(type: 'change', listener: () => void): void;
  removeEventListener(type: 'change', listener: () => void): void;
} & EventTarget;

/**
 * Navigator with connection property
 */
type NavigatorWithConnection = {
  connection?: NetworkInformation;
} & Navigator;

/**
 * Individual indicators for low power mode detection
 */
type LowPowerIndicators = {
  /** Battery is low (≤20%) and not charging */
  lowBattery: boolean;
  /** User enabled data saver mode in browser */
  saveData: boolean;
  /** User prefers reduced motion (often enabled with battery saver) */
  reducedMotion: boolean;
};

/**
 * Low power mode detection result
 */
type LowPowerMode = {
  /** True if any indicator suggests low power mode */
  isLowPowerMode: boolean;
  /** Individual indicators breakdown */
  indicators: LowPowerIndicators;
  /** Current battery level (0-1), undefined if Battery API not supported */
  batteryLevel?: number;
  /** True if device is charging, undefined if Battery API not supported */
  charging?: boolean;
};

/**
 * Check if user prefers reduced motion
 */
function getPrefersReducedMotion(): boolean {
  if (isServer()) {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get navigator connection safely
 */
function getNavigatorConnection(): NetworkInformation | null {
  if (isServer() || !('connection' in navigator)) {
    return null;
  }

  try {
    return (navigator as NavigatorWithConnection).connection ?? null;
  } catch {
    return null;
  }
}

/**
 * Check if data saver is enabled
 */
function getSaveDataEnabled(): boolean {
  const connection = getNavigatorConnection();

  if (connection == null) {
    return false;
  }

  return connection.saveData === true;
}

/**
 * Get current low power mode state
 */
async function getLowPowerMode(): Promise<LowPowerMode> {
  const reducedMotion = getPrefersReducedMotion();
  const saveData = getSaveDataEnabled();

  if (isServer() || !('getBattery' in navigator)) {
    return {
      isLowPowerMode: reducedMotion || saveData,
      indicators: {
        lowBattery: false,
        saveData,
        reducedMotion,
      },
    };
  }

  try {
    const battery = await (navigator as NavigatorWithBattery).getBattery?.();
    if (battery == null) {
      return {
        isLowPowerMode: reducedMotion || saveData,
        indicators: {
          lowBattery: false,
          saveData,
          reducedMotion,
        },
      };
    }

    const lowBattery = battery.level <= LOW_BATTERY_THRESHOLD && !battery.charging;

    return {
      isLowPowerMode: lowBattery || reducedMotion || saveData,
      indicators: {
        lowBattery,
        saveData,
        reducedMotion,
      },
      batteryLevel: battery.level,
      charging: battery.charging,
    };
  } catch {
    return {
      isLowPowerMode: reducedMotion || saveData,
      indicators: {
        lowBattery: false,
        saveData,
        reducedMotion,
      },
    };
  }
}

/**
 * React hook to detect low power mode indicators
 *
 * Combines multiple signals to detect if the user is likely in a low-power scenario:
 * - Battery level ≤20% and not charging (Battery API)
 * - Data saver mode enabled (Network Information API)
 * - Reduced motion preference (often enabled with battery saver)
 *
 * Note: There is no direct API to detect OS-level low power mode. This hook
 * provides heuristic indicators that suggest power-conscious behavior.
 *
 * **Important**: The Battery API is deprecated in some browsers and may be removed.
 * This hook provides graceful degradation when the API is unavailable, falling back
 * to other indicators (Data Saver, Reduced Motion).
 *
 * @returns {LowPowerMode} Low power mode detection result
 * - `isLowPowerMode` - True if any indicator suggests low power mode
 * - `indicators.lowBattery` - Battery ≤20% and not charging
 * - `indicators.saveData` - Data saver enabled in browser
 * - `indicators.reducedMotion` - Reduced motion preference enabled
 * - `batteryLevel` - Current battery level (0-1), undefined if not supported
 * - `charging` - Whether device is charging, undefined if not supported
 *
 * @example
 * ```tsx
 * function VideoPlayer() {
 *   const { isLowPowerMode, indicators } = useLowPowerMode();
 *
 *   // Show static image instead of video in low power scenarios
 *   if (isLowPowerMode) {
 *     return (
 *       <div>
 *         <img src="thumbnail.jpg" alt="Video thumbnail" />
 *         <p>Video paused to save battery</p>
 *       </div>
 *     );
 *   }
 *
 *   return <video src="video.mp4" autoPlay />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * function App() {
 *   const { indicators, batteryLevel } = useLowPowerMode();
 *
 *   // Make decisions based on specific indicators
 *   const shouldReduceQuality = indicators.lowBattery || indicators.saveData;
 *
 *   return (
 *     <div>
 *       {batteryLevel != null && (
 *         <p>Battery: {Math.round(batteryLevel * 100)}%</p>
 *       )}
 *       <Content quality={shouldReduceQuality ? 'low' : 'high'} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useLowPowerMode(): LowPowerMode {
  const [lowPowerMode, setLowPowerMode] = useState<LowPowerMode>({
    isLowPowerMode: false,
    indicators: {
      lowBattery: false,
      saveData: false,
      reducedMotion: false,
    },
  });

  useEffect(function handleLowPowerModeChange() {
    if (isServer()) {
      return;
    }

    let isMounted = true;
    let battery: BatteryManager | null = null;
    let mediaQuery: MediaQueryList | null = null;
    let connection: NetworkInformation | null = null;

    async function updateLowPowerMode() {
      const state = await getLowPowerMode();
      if (isMounted) {
        setLowPowerMode(state);
      }
    }

    async function setupListeners() {
      // Initial update
      await updateLowPowerMode();

      // Battery listeners
      if ('getBattery' in navigator) {
        try {
          const batteryManager = (await (navigator as NavigatorWithBattery).getBattery?.()) ?? null;
          if (batteryManager != null && isMounted) {
            battery = batteryManager; // Assign only if still mounted
            battery.addEventListener('chargingchange', updateLowPowerMode);
            battery.addEventListener('levelchange', updateLowPowerMode);
          }
        } catch {
          // Battery API not supported
        }
      }

      // Reduced motion listener
      if (isMounted) {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', updateLowPowerMode);
      }

      // Connection listener (Data Saver)
      if (isMounted) {
        const conn = getNavigatorConnection();
        if (conn != null) {
          connection = conn;
          connection.addEventListener('change', updateLowPowerMode);
        }
      }
    }

    void setupListeners();

    return function cleanup() {
      isMounted = false;
      if (battery != null) {
        battery.removeEventListener('chargingchange', updateLowPowerMode);
        battery.removeEventListener('levelchange', updateLowPowerMode);
      }
      if (mediaQuery != null) {
        mediaQuery.removeEventListener('change', updateLowPowerMode);
      }
      if (connection != null) {
        connection.removeEventListener('change', updateLowPowerMode);
      }
    };
  }, []);

  return lowPowerMode;
}
