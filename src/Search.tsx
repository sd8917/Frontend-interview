import { useMemo, useState } from "react";
import useDebounce from "./useDebounce";

/**
 * Search Component with Debounce
 * 
 * How it works:
 * 1. User types in input (value updates immediately)
 * 2. useDebounce waits 500ms after user stops typing
 * 3. debouncedValue updates → triggers expensive filter
 * 4. Results display only after user finishes typing
 * 
 * Benefits:
 * - Reduces number of re-renders
 * - Avoids expensive operations during typing
 * - Better performance on large datasets
 * - Better UX (results update intelligently)
 */

function Search() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500); // Wait 500ms after typing stops

  // Expensive operation - only runs when debouncedValue changes (after user stops typing)
  const results = useMemo(() => {
    console.log("Searching for:", debouncedValue);
    return items.filter(item => 
      item.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [debouncedValue]);

  return (
    <>
      <input 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to search (waits for you to stop)..."
      />
      <SearchResults results={results} debouncedValue={debouncedValue} isSearching={value !== debouncedValue} />
    </>
  );
}

function SearchResults({ results, debouncedValue, isSearching }: any) {
  return (
    <div>
      {isSearching && <p>⏳ Waiting for you to finish typing...</p>}
      {!isSearching && <p>Searched for: "{debouncedValue}"</p>}
      <ul>
        {results.map((item: string, idx: number) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {results.length === 0 && debouncedValue && <p>No results found</p>}
    </div>
  );
}

const items = ["apple", "apricot", "banana", "blueberry", "cherry", "date", "elderberry", "fig"];

export default Search