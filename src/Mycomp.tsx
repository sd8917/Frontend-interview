import { useState, memo } from "react";

// function Child({ count }: any) {
//   console.log("Child rendered");
//   return <div>Count: {count}</div>;
// }

const Child = memo(function Child({ count }: any) {
  console.log("Child rendered");
  return <div>Count: {count}</div>;
});


export default function Parent() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <>
      <Child count={a} />
      <button onClick={() => setB(b + 1)}>Update B</button>
    </>
  );
}
