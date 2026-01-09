/**
 * Check if the code is running on the server
 *
 * @returns true if running in a server environment (SSR), false otherwise
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}
