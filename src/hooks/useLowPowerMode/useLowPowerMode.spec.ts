import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { renderHookSSR } from '../../_internal/test-utils/renderHookSSR.tsx';

import { useLowPowerMode } from './useLowPowerMode.ts';

describe('useLowPowerMode', () => {
  it('is safe on server side rendering', () => {
    const result = renderHookSSR.serverOnly(() => useLowPowerMode());

    expect(result.current).toEqual({
      isLowPowerMode: false,
      indicators: {
        lowBattery: false,
        saveData: false,
        reducedMotion: false,
      },
    });
  });

  describe('browser environment', () => {
    let mockBattery: {
      charging: boolean;
      level: number;
      chargingTime: number;
      dischargingTime: number;
      addEventListener: ReturnType<typeof vi.fn>;
      removeEventListener: ReturnType<typeof vi.fn>;
    };
    let mockConnection: {
      saveData?: boolean;
      addEventListener: ReturnType<typeof vi.fn>;
      removeEventListener: ReturnType<typeof vi.fn>;
    };
    let mockMediaQuery: {
      matches: boolean;
      addEventListener: ReturnType<typeof vi.fn>;
      removeEventListener: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
      mockBattery = {
        charging: true,
        level: 1.0,
        chargingTime: 0,
        dischargingTime: Infinity,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockConnection = {
        saveData: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      Object.defineProperty(navigator, 'getBattery', {
        writable: true,
        configurable: true,
        value: vi.fn().mockResolvedValue(mockBattery),
      });

      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: mockConnection,
      });

      vi.spyOn(window, 'matchMedia').mockImplementation((query: string) => {
        if (query === '(prefers-reduced-motion: reduce)') {
          return mockMediaQuery as MediaQueryList;
        }
        return {
          matches: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        } as unknown as MediaQueryList;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should return initial state (no low power indicators)', async () => {
      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.batteryLevel).toBe(1.0);
        expect(result.current.charging).toBe(true);
      });

      expect(result.current).toMatchObject({
        isLowPowerMode: false,
        indicators: {
          lowBattery: false,
          saveData: false,
          reducedMotion: false,
        },
        batteryLevel: 1.0,
        charging: true,
      });
    });

    it('should detect low battery (≤20% and not charging)', async () => {
      mockBattery.level = 0.15;
      mockBattery.charging = false;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.lowBattery).toBe(true);
      });

      expect(result.current).toMatchObject({
        isLowPowerMode: true,
        indicators: {
          lowBattery: true,
          saveData: false,
          reducedMotion: false,
        },
        batteryLevel: 0.15,
        charging: false,
      });
    });

    it('should not detect low battery if charging', async () => {
      mockBattery.level = 0.15;
      mockBattery.charging = true;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.batteryLevel).toBe(0.15);
      });

      expect(result.current.indicators.lowBattery).toBe(false);
      expect(result.current.isLowPowerMode).toBe(false);
    });

    it('should detect saveData mode', async () => {
      mockConnection.saveData = true;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.saveData).toBe(true);
      });

      expect(result.current.isLowPowerMode).toBe(true);
    });

    it('should detect reduced motion preference', async () => {
      mockMediaQuery.matches = true;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.reducedMotion).toBe(true);
      });

      expect(result.current.isLowPowerMode).toBe(true);
    });

    it('should detect multiple indicators simultaneously', async () => {
      mockBattery.level = 0.1;
      mockBattery.charging = false;
      mockConnection.saveData = true;
      mockMediaQuery.matches = true;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.isLowPowerMode).toBe(true);
      });

      expect(result.current.indicators).toEqual({
        lowBattery: true,
        saveData: true,
        reducedMotion: true,
      });
    });

    it('should update on battery level change', async () => {
      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.batteryLevel).toBe(1.0);
      });

      const levelChangeHandler = mockBattery.addEventListener.mock.calls.find(
        ([event]) => event === 'levelchange'
      )?.[1];

      await act(async () => {
        mockBattery.level = 0.15;
        mockBattery.charging = false;
        if (levelChangeHandler != null) {
          levelChangeHandler();
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      await waitFor(() => {
        expect(result.current.indicators.lowBattery).toBe(true);
      });
    });

    it('should update on charging status change', async () => {
      mockBattery.level = 0.15;
      mockBattery.charging = false;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.lowBattery).toBe(true);
      });

      const chargingChangeHandler = mockBattery.addEventListener.mock.calls.find(
        ([event]) => event === 'chargingchange'
      )?.[1];

      await act(async () => {
        mockBattery.charging = true;
        if (chargingChangeHandler != null) {
          chargingChangeHandler();
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      await waitFor(() => {
        expect(result.current.indicators.lowBattery).toBe(false);
      });
    });

    it('should update on reduced motion change', async () => {
      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.reducedMotion).toBe(false);
      });

      const mediaQueryChangeHandler = mockMediaQuery.addEventListener.mock.calls.find(
        ([event]) => event === 'change'
      )?.[1];

      await act(async () => {
        mockMediaQuery.matches = true;
        if (mediaQueryChangeHandler != null) {
          mediaQueryChangeHandler();
        }
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      await waitFor(() => {
        expect(result.current.indicators.reducedMotion).toBe(true);
      });
    });

    it('should handle missing Battery API gracefully', async () => {
      Object.defineProperty(navigator, 'getBattery', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.isLowPowerMode).toBeDefined();
      });

      expect(result.current.batteryLevel).toBeUndefined();
      expect(result.current.charging).toBeUndefined();
    });

    it('should handle Battery API rejection gracefully', async () => {
      Object.defineProperty(navigator, 'getBattery', {
        writable: true,
        configurable: true,
        value: vi.fn().mockRejectedValue(new Error('Battery API not supported')),
      });

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.isLowPowerMode).toBeDefined();
      });

      expect(result.current.batteryLevel).toBeUndefined();
      expect(result.current.charging).toBeUndefined();
    });

    it('should handle missing connection API gracefully', async () => {
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.indicators.saveData).toBe(false);
      });
    });

    it('should remove all event listeners on unmount', async () => {
      const { unmount } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(mockBattery.addEventListener).toHaveBeenCalled();
      });

      unmount();

      expect(mockBattery.removeEventListener).toHaveBeenCalledWith('chargingchange', expect.any(Function));
      expect(mockBattery.removeEventListener).toHaveBeenCalledWith('levelchange', expect.any(Function));
      expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
      expect(mockConnection.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should handle boundary case: exactly 20% battery', async () => {
      mockBattery.level = 0.2;
      mockBattery.charging = false;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.batteryLevel).toBe(0.2);
      });

      expect(result.current.indicators.lowBattery).toBe(true);
    });

    it('should handle boundary case: just above 20% battery', async () => {
      mockBattery.level = 0.21;
      mockBattery.charging = false;

      const { result } = renderHook(() => useLowPowerMode());

      await waitFor(() => {
        expect(result.current.batteryLevel).toBe(0.21);
      });

      expect(result.current.indicators.lowBattery).toBe(false);
    });
  });
});
