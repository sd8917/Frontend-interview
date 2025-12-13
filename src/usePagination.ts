import { useEffect, useState } from "react";

const LIMIT = 5;

const usePagination = (page: number) => {
    const [data, setData] = useState<any[]>([]);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{

        const controller = new AbortController();

        setLoading(true);
        setError(null);

       fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${LIMIT}`,
            { signal: controller.signal }
        )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(err => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
      
       // ✅ cancel previous request
        return () => controller.abort();
    }, [page]);


    return {data, loading, error};
}

export default usePagination;