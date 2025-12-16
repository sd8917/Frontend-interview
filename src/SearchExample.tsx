import { useState, useTransition } from "react";

export default function SearchExample() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isPending, startTransition] = useTransition();

    // Mock: large dataset (10,000 items)
    const [items] = useState(() =>
        Array.from({ length: 10000 }, (_, i) => `Product ${i + 1}`)
    );

    const handleSearch = (text: string) => {
        setQuery(text); // urgent update → immediate

        // Non-urgent update → can be delayed
        startTransition(() => {
            const filtered = items.filter((item) =>
                item.toLowerCase().includes(text.toLowerCase())
            );
            setResults(filtered as []);
        });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Product Search (10,000 items)</h2>

            <input
                type="text"
                value={query}
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                style={{ padding: 10, width: "300px" }}
            />

            {isPending && <p style={{ color: "blue" }}>Updating results…</p>}

            <ul>
                {results.slice(0, 20).map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
