import { useEffect, useRef, useState } from "react";

const mockData = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grapes",
  "Mango",
  "Orange",
  "Pineapple",
  "Strawberry"
];

const Autocomplete = () => {
  console.log("🔄 Autocomplete render");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef(null);

  // 🔍 Simulate API (debounced)
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const id = setTimeout(() => {
      const filtered = mockData.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered as any);
      setOpen(true);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  // ❌ Close on outside click
  useEffect(() => {
    const handler = (e: any) => {
      if (!(containerRef.current as any)?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ⌨️ Keyboard navigation
  const handleKeyDown = (e: any) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      setQuery(results[activeIndex]);
      setOpen(false);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ width: "300px" }}>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits..."
      />

      {open && results.length > 0 && (
        <ul style={styles.dropdown as any}>
          {results.map((item, index) => (
            <li
              key={item}
              style={{
                ...styles.item,
                background:
                  index === activeIndex ? "#eee" : "transparent"
              }}
              onMouseDown={() => {
                setQuery(item);
                setOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;

const styles = {
  dropdown: {
    border: "1px solid #ccc",
    listStyle: "none",
    margin: 0,
    padding: 0,
    maxHeight: "150px",
    overflowY: "auto",
    color: "green",
  },
  item: {
    padding: "8px",
    cursor: "pointer"
  }
};
