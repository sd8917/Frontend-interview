import { useEffect, useState } from "react"
import useDebounced from "./hooks/useDebounced"


const App3 = () => {

  const [search, setSearch] = useState("");
   const debouncedValue = useDebounced({
    value: search,
    delay: 500,
  });

  // Example: API call
  useEffect(() => {
    if (debouncedValue) {
      console.log("API call for:", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <>

       <input type="text" onChange={(e) => setSearch(e.target.value)} name="name" placeholder="Enter your value" />

       <p>Searched for {search}</p>
    </>
  )
}

export default App3
