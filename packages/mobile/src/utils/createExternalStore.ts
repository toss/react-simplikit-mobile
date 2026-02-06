/**
 * Creates an external store compatible with React's useSyncExternalStore.
 *
 * @example
 * ```tsx
 * const countStore = createExternalStore(0);
 *
 * // In a React component
 * function Counter() {
 *   const count = useSyncExternalStore(
 *     countStore.subscribe,
 *     countStore.getSnapshot,
 *     countStore.getServerSnapshot
 *   );
 *
 *   return <button onClick={() => countStore.setState(count + 1)}>{count}</button>;
 * }
 *
 * // Or use the provided hook
 * function Counter() {
 *   const count = countStore.useStore();
 *   return <button onClick={() => countStore.setState(count + 1)}>{count}</button>;
 * }
 * ```
 */

import { useSyncExternalStore } from 'react';

export type ExternalStore<T> = {
  /** Subscribe to store changes. Returns unsubscribe function. */
  subscribe: (callback: () => void) => () => void;

  /** Get current state (client-side). */
  getSnapshot: () => T;

  /** Get state for SSR. Returns the initial value. */
  getServerSnapshot: () => T;

  /** Update the state and notify all subscribers. */
  setState: (nextState: T | ((prev: T) => T)) => void;

  /** Get current state without subscription. */
  getState: () => T;

  /** React hook to use this store with automatic subscription. */
  useStore: () => T;
};

export function createExternalStore<T>(initialState: T): ExternalStore<T> {
  let state: T = initialState;
  const listeners = new Set<() => void>();

  const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const emit = () => {
    listeners.forEach(listener => listener());
  };

  const getSnapshot = () => state;

  const getServerSnapshot = () => initialState;

  const setState = (nextState: T | ((prev: T) => T)) => {
    const newState = typeof nextState === 'function' ? (nextState as (prev: T) => T)(state) : nextState;

    if (!Object.is(state, newState)) {
      state = newState;
      emit();
    }
  };

  const getState = () => state;

  const useStore = () => {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot,
    setState,
    getState,
    useStore,
  };
}
