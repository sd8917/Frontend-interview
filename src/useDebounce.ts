import { useEffect, useState } from "react";

/**
 * useDebounce Hook - Quick Docs
 * 
 * Purpose: Delay updating a value until the user stops typing/changing it
 * 
 * Syntax: const debouncedValue = useDebounce(value, delay)
 * 
 * Parameters:
 * - value: The value to debounce (usually from input)
 * - delay: Wait time in milliseconds (default: 500ms)
 * 
 * Returns: The debounced value that only updates after the delay period
 * 
 * Use Cases:
 * - Search input (wait for user to finish typing before searching)
 * - API calls (avoid spamming requests)
 * - Form validation (check after user stops typing)
 * - Real-time filtering
 * 
 * How it works:
 * 1. User types → value updates immediately
 * 2. Timer starts counting down
 * 3. If user types again before timer ends → timer resets
 * 4. When timer completes → debouncedValue updates
 * 5. Only then does expensive operation run (search, API call, etc)
 * 
 * Example:
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * Results only update 500ms after user stops typing
 */

function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timer if value changes before delay completes
    return () => clearTimeout(handler);
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
