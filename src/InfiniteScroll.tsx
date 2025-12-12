import { useEffect, useRef, useState } from "react";

// Pre-fetch next page to mimic Netflix-style ahead-of-time loading
function InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<{ title: string }[]>([]);
  const nextPageCache = useRef<{ [key: number]: { title: string }[] }>({});
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPage = async (pageToFetch: number) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageToFetch}&_limit=4`
      );
      return (await res.json()) as { title: string }[];
    };

    const loadCurrent = async () => {
      // Serve from cache if present
      const cached = nextPageCache.current[page];
      const currentData = cached ?? (await fetchPage(page));
      if (cancelled) return;

      // Append current page
      setItems(prev => [...prev, ...currentData]);

      // Pre-fetch next page in background
      const nextPage = page + 1;
      if (!nextPageCache.current[nextPage]) {
        fetchPage(nextPage)
          .then(data => {
            nextPageCache.current[nextPage] = data;
          })
          .catch(() => {
            // ignore prefetch errors
          });
      }
    };

    loadCurrent();

    return () => {
      cancelled = true;
    };
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) {
        setPage(p => p + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {items.map((i, idx) => (
        <p key={idx}>{i.title}</p>
      ))}
      <div ref={loaderRef}>Loading...</div>
    </>
  );
}

export default InfiniteScroll