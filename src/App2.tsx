import { memo,useState } from "react";


// Old child component which render on every parent component render
// function Child({ count }:{count: number}) {
//   console.log("Child rendered");
//   return <p>Count: {count}</p>;
// }

const Child = memo(function Child({ count }:{count: number}) {
  console.log("Child rendered");
  return <p>Count: {count}</p>;
});


function App() {
  const [text, setText] = useState("");

  return (
    <>
      <input onChange={e => setText(e.target.value)} />
      <Child count={10} />
    </>
  );
}

export default App;
