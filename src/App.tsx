import { useState } from "react";
import Modal from "./Modal";
import SearchExample from "./SearchExample";
import InfiniteScroll from "./InfiniteScrol";


function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      {open && (
        <Modal>
          <h2>Hello from Portal!</h2>
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal>
      )}

      {/* <SearchExample /> */}

      <InfiniteScroll />
    </>
  );
}

export default App;
