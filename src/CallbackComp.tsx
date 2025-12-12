import { useState, useCallback } from "react";
import Child from "./Child";

export default function Parent() {
  const [count, setCount] = useState(0);

 
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);


   console.log("Parent rendered");


  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}
