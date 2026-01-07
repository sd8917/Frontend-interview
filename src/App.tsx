// import  { useState } from "react";
// import "./styles.css";

import { useEffect, useRef, useState } from "react";

// const initialItems = [
//   { id: 1, text: "React" },
//   { id: 2, text: "Node" 
// },
//   { id: 3, text: "MongoDB" },
//   { id: 4, text: "TypeScript" },
// ];

//  function App() {
//   const [items, setItems] = useState(initialItems);
//   const [draggedId, setDraggedId] = useState(null);

//   const onDragStart = (id: any) => {
//     setDraggedId(id);
//   };

//   const onDragOver = (e: any) => {
//     e.preventDefault(); // REQUIRED
//   };

//   const onDrop = (targetId: any) => {
//     if (draggedId === targetId) return;

//     setItems((prev) => {
//       const newItems = [...prev]; // ✅ IMMUTABLE COPY


//       const fromIndex = newItems.findIndex(i => i.id === draggedId);
//       console.log("fromindx",fromIndex);
//       const toIndex = newItems.findIndex(i => i.id === targetId);
//       console.log("toIndex",toIndex);

//       const [movedItem] = newItems.splice(fromIndex, 1);

//       // console.log('movedItem', movedItem)
//       newItems.splice(toIndex, 0, movedItem);


//       return newItems;
//     });
//   };

//   return (
//     <div className="container">
//       <h2>Drag & Drop List</h2>

//       {items.map((item) => (
//         <div
//           key={item.id}                 // ✅ STABLE KEY
//           draggable
//           onDragStart={() => onDragStart(item.id)}
//           onDragOver={onDragOver}
//           onDrop={() => onDrop(item.id)}
//           className="item"
//         >
//           {item.text}
//         </div>
//       ))}
//     </div>
//   );
// }


// export default App;

const App = () => {
  
  const [count, setCount] = useState(0);
  console.log("app", count)

  const countRef = useRef(count);

useEffect(() => {
  countRef.current = count;
}, [count]);

  useEffect(() => {
    console.log("rendering...")
     if (count >= 20) return;
    const id = setInterval(() => {
     console.log("current ", countRef.current)
    }, 1000);

    return () => clearInterval(id);
  }, [count]);

  return (
    <>
      <h1>Count {count}</h1>
    </>
  )
}

export default App;