
## 🔥 2. Debounced Search Input

## 🧠 Problem

- Create a search box that:
- Calls API after user stops typing (300ms)
- Cancels previous requests
- Shows loading indicator

## ✅ Solution

The `useDebounce` hook implements debouncing to delay API calls until the user stops typing:

### How It Works

```
User types "a p p l e" (5 keystrokes)
     ↓
Input value updates instantly (local state)
     ↓
Debounce timer starts: 300ms... 200ms... 100ms...
     ↓
User types again → Timer RESETS (cancels previous)
     ↓
User STOPS typing (300ms of silence)
     ↓
debouncedValue updates → Triggers useEffect
     ↓
API call fires (only 1 call, not 5!)
```

### Files

- **`useDebounce.ts`** - Custom hook with full documentation
- **`App.tsx`** - Implementation with API calls and loading state

### Code Example

```tsx
import useDebounce from "./userDebounce";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // API only called after 300ms pause
    fakeApi(debouncedSearch)
      .then(data => setResults(data))
      .finally(() => setLoading(false));
  }, [debouncedSearch]); // ✅ Depends on debounced value, not raw input

  return (
    <>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Type to search..."
      />
      {loading && <p>⏳ Searching...</p>}
      <ul>
        {results.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

### Key Features

✅ **Timer Reset Logic** - Clears previous setTimeout when value changes  
✅ **Cleanup Function** - clearTimeout prevents memory leaks  
✅ **Memoized Return** - useMemo prevents unnecessary child re-renders  
✅ **Smart Initialization** - Starts with actual value, not empty  
✅ **Configurable Delay** - Default 300ms, adjustable per use  

### Performance Impact

**WITHOUT debounce** (typing "apple"):
- 5 keystrokes → 5 re-renders → 5 API calls → ❌ 80% wasted

**WITH debounce** (300ms):
- 5 keystrokes → 5 input re-renders → 1 API call → ✅ 80% fewer requests

### Common Mistakes to Avoid

❌ **Missing cleanup**
```tsx
// ❌ WRONG - timer never cancels
useEffect(() => {
  setTimeout(() => setDebouncedValue(value), delay);
}, [value]);
```

✅ **Correct - timer cancels on change**
```tsx
// ✅ RIGHT
useEffect(() => {
  const timer = setTimeout(() => setDebouncedValue(value), delay);
  return () => clearTimeout(timer); // Cleanup!
}, [value]);
```

❌ **Using setInterval** (fires repeatedly every Nms)
```tsx
// ❌ WRONG - defeats debounce purpose
setInterval(() => { /* ... */ }, 300);
```

✅ **setTimeout** (fires once after Nms of silence)
```tsx
// ✅ RIGHT
setTimeout(() => { /* ... */ }, 300);
```

❌ **Missing dependencies**
```tsx
// ❌ WRONG - never resets timer
useEffect(() => {
  const timer = setTimeout(() => setDebouncedValue(value), delay);
  return () => clearTimeout(timer);
}, []); // Empty deps!
```

✅ **Correct dependencies**
```tsx
// ✅ RIGHT
useEffect(() => {
  const timer = setTimeout(() => setDebouncedValue(value), delay);
  return () => clearTimeout(timer);
}, [value, delay]); // Includes all dependencies
```

### Testing

1. **Type quickly** → Verify API not called yet ⏳
2. **Pause for 300ms** → Verify API call fires ✅
3. **Type again before 300ms** → Verify previous call is cancelled 🔄
4. **Unmount component** → Verify no memory leaks 🧹

### Use Cases

- 🔍 Search input (wait before searching)
- 💾 Auto-save (wait before saving)
- 🔗 API calls (avoid spamming requests)
- ✔️ Form validation (check after user stops)
- 🎯 Real-time filtering (debounce expensive computations)

### Why Debounce?

User experience: Waiting 300ms is imperceptible, but 5 API calls feels slow.
Performance: Reduces server load, browser work, and bandwidth.
Cost: Fewer API calls = lower cloud costs.

## 🎯 Tests Covered

- ✅ useEffect (dependency array, cleanup)
- ✅ useRef (for timer reference)
- ✅ useState (for debounced value)
- ✅ useMemo (for memoization)
- ✅ Debouncing logic (timer reset, delay)
- ✅ Cleanup logic (clearTimeout prevents leaks)

## ⚠️ Trap

❌ Calling API inside onChange directly.
```tsx
// ❌ WRONG - fires on EVERY keystroke
<input onChange={e => {
  const value = e.target.value;
  fakeApi(value); // Bad!
}} />
```

✅ Use debounce instead.
```tsx
// ✅ RIGHT - fires after 300ms of silence
const debouncedValue = useDebounce(value, 300);
useEffect(() => {
  fakeApi(debouncedValue);
}, [debouncedValue]);
```

===
 * 6. Dependent effects/components trigger only then
 * 
 * TIMELINE EXAMPLE (300ms delay):
 * ┌─────────────────────────────────────────────┐
 * │ User: t   y   p   e   |   (stops)   |     |
 * │ Input: apple (instant update)               │
 * │ Timer: ↻   ↻   ↻   ↻          ✅ (fires)   │
 * │ Debounced: ─────────────────────────> apple│
 * └─────────────────────────────────────────────┘
 * 
 * KEY FEATURES:
 * ✅ Resets timer on every change (prevents multiple triggers)
 * ✅ Cleans up timer on unmount (no memory leaks)
 * ✅ Memoized return value (prevents unnecessary re-renders)
 * ✅ Initializes with actual value (not empty)
 * 
 * USE CASES:
 * - Search input (wait before searching)
 * - API calls (avoid spamming requests)
 * - Form validation (check after user stops)
 * - Real-time filtering (debounce computations)
 * - Auto-save (wait for user to stop editing)
 * 
 * PERFORMANCE IMPACT:
 * WITHOUT debounce:
 *   Type "apple" (5 chars)
 *   → 5 re-renders
 *   → 5 API calls
 *   → 5 expensive operations
 * 
 * WITH debounce (300ms):
 *   Type "apple" (5 chars)
 *   → 5 re-renders (on input)
 *   → 1 re-render (after debounce)
 *   → 1 API call (saves 80% requests)
 *   → Much better UX!
 * 
 * COMMON MISTAKES TO AVOID:
 * ❌ Missing cleanup: setDebouncedValue(searchTerm) without clearTimeout
 *    → Multiple timers fire, multiple updates
 * ❌ Using setInterval instead: fires repeatedly every N ms
 *    → Defeats the purpose, wastes resources
 * ❌ Dependencies missing [searchTerm, delay]: timer never resets
 *    → Only first value is used
 * ❌ Initializing as useState(""): starts empty
 *    → First render shows blank, confusing UX
 * 
 * IMPLEMENTATION DETAILS:
 * - Uses setTimeout for one-time delayed execution
 * - clearTimeout cleanup prevents memory leaks
 * - useMemo prevents downstream re-renders
 * - Dependencies: [searchTerm, delay]
 * 
 * EXAMPLE IN App.tsx:
 * const [searchTerm, setSearchTerm] = useState("");
 * const debouncedSearch = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   if (!debouncedSearch) return;
 *   fetchAPI(debouncedSearch); // Only fires after 300ms pause
 * }, [debouncedSearch]);
 * 
 * TESTING:
 * - Type quickly → verify API not called yet
 * - Pause for 300ms → verify API call fires
 * - Type again before 300ms → verify API call is cancelled
 * - Unmount component → verify no memory leaks
 * 
 * ===================================
 */
