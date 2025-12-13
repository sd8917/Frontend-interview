import { useEffect, useRef } from "react";

/**
 * useRetryInterval Hook
 * 
 * Purpose: Use setInterval to retry an operation, stop after N failures
 * 
 * Parameters:
 * - callback: async function to retry
 * - interval: milliseconds between retries (default: 1000ms)
 * - maxRetries: max failures before stopping (default: 3)
 * - enabled: enable/disable the interval (default: true)
 * 
 * Returns: { retries, lastError, reset }
 * 
 * Use Cases:
 * - Polling API with retry logic
 * - Health checks with failure threshold
 * - Auto-reconnect attempts
 * - Sync operations with fallback
 * 
 * Example:
 * const { retries } = useRetryInterval(
 *   () => fetchData(),
 *   2000,
 *   3
 * );
 * Shows "Failed 2/3 times"
 */

interface UseRetryIntervalOptions {
  callback: () => Promise<any>;
  interval?: number;
  maxRetries?: number;
  enabled?: boolean;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}

function useRetryInterval({
  callback,
  interval = 1000,
  maxRetries = 3,
  enabled = true,
  onSuccess,
  onFailure,
}: UseRetryIntervalOptions) {
  const retriesRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastErrorRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;

    const attemptCallback = async () => {
      try {
        const result = await callback();
        console.log("✅ Success:", result);
        onSuccess?.();
        
        // ✅ Stop interval on success
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        retriesRef.current = 0;
      } catch (error) {
        retriesRef.current += 1;
        lastErrorRef.current = error;
        console.log(`❌ Attempt ${retriesRef.current}/${maxRetries} failed:`, error);
        onFailure?.(error);

        // ✅ Stop interval after max retries
        if (retriesRef.current >= maxRetries) {
          console.log(`⚠️ Max retries (${maxRetries}) reached. Stopping.`);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }
    };

    // Try immediately first
    attemptCallback();

    // Then set up interval for retries
    intervalRef.current = setInterval(() => {
      if (retriesRef.current < maxRetries) {
        attemptCallback();
      }
    }, interval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, callback, interval, maxRetries, onSuccess, onFailure]);

  return {
    retries: retriesRef.current,
    maxRetries,
    lastError: lastErrorRef.current,
    isActive: intervalRef.current !== null,
    reset: () => {
      retriesRef.current = 0;
      lastErrorRef.current = null;
    },
  };
}

export default useRetryInterval;
