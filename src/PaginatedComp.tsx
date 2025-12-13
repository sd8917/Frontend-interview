// it will be using our pagination hooks..
import { useState } from "react";
import "./paginatedComp.css";
import usePagination from "./usePagination";

function PaginatedComp() {
  const [page, setPage] = useState(1);
  const { data, loading, error } = usePagination(page);

  return (
    <>
      <h2>Posts</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
        Prev
      </button>
      <span> Page {page} </span>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </>
  );
}

export default PaginatedComp;
