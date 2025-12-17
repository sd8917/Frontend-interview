import  { useState } from "react";
import "./styles.css";
import DelegationExample from "./DelegationExample";

const initialItems = [
  { id: 1, text: "React" },
  { id: 2, text: "Node" },
  { id: 3, text: "MongoDB" },
  { id: 4, text: "TypeScript" },
];

 function App() {
  const [items, setItems] = useState(initialItems);
  const [draggedId, setDraggedId] = useState(null);

  const onDragStart = (id: any) => {
    setDraggedId(id);
  };

  const onDragOver = (e: any) => {
    e.preventDefault(); // REQUIRED
  };

  const onDrop = (targetId: any) => {
    if (draggedId === targetId) return;

    setItems((prev) => {
      const newItems = [...prev]; // ✅ IMMUTABLE COPY


      const fromIndex = newItems.findIndex(i => i.id === draggedId);
      console.log("fromindx",fromIndex);
      const toIndex = newItems.findIndex(i => i.id === targetId);
      console.log("toIndex",toIndex);

      const [movedItem] = newItems.splice(fromIndex, 1);

      // console.log('movedItem', movedItem)
      newItems.splice(toIndex, 0, movedItem);


      return newItems;
    });
  };

  return (
    <div className="container">
      <h2>Drag & Drop List</h2>

      {/* {items.map((item) => (
        <div
          key={item.id}                 // ✅ STABLE KEY
          draggable
          onDragStart={() => onDragStart(item.id)}
          onDragOver={onDragOver}
          onDrop={() => onDrop(item.id)}
          className="item"
        >
          {item.text}
        </div>
      ))} */}

      <DelegationExample />
    </div>
  );
}


export default App;