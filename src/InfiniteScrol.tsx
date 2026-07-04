import { useEffect, useRef, useState } from "react";

interface Item {
  title: string;
}

function InfiniteScroll() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const loaderRef = useRef(null);

  // Function to generate dummy data
  const generateDummyData = (page: number): Item[] => {
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage + 1;
    const endIndex = page * itemsPerPage;
    const newItems: Item[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      newItems.push({ title: `Item ${i}` });
    }
    return newItems;
  };

  useEffect(() => {
    const newItems = generateDummyData(page);
    setItems(prev => [...prev, ...newItems]);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log("entry ", entry)
        if (entry.isIntersecting) {
          setPage(p => p + 1);
        }
      },
      { threshold: 1 }
    );

    console.log(" lll == ", loaderRef.current)
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        {items.map((item, i) => (
          <div key={i}>{item.title}</div>
        ))}
      </div>

      {/* This div triggers loading */}
      <div ref={loaderRef} style={{ height: 10, padding: "100px" }} />
    </>
  );
}

export default InfiniteScroll;
