import { useEffect, useState } from "react";
import useDebounce from "./userDebounce";

const fakeApi = (query: string, signal: AbortSignal) =>
  new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      if (signal.aborted) {
        reject("aborted");
      }
      resolve(
        ["orange", "apple", "mango", "guava", "pineapple", "oats"]
          .filter(item => item.includes(query))
      );
    }, 800);
  });

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch =useDebounce(searchTerm, 300);

  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fakeApi(debouncedSearch, controller.signal)
      .then(data => setResults(data))
      .catch(err => {
        if (err !== "aborted") console.error(err);
      })
      .finally(() => setLoading(false));

    // ✅ cancel previous request
    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <>
      <h3>Debounced Search</h3>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}

      <ul>
        {results.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
