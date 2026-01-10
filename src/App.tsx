import { useDispatch, useSelector } from "react-redux";
import { increasement, decreasment, reset} from "../src/counterSlicer";

function App() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>

      <button onClick={() => dispatch(increasement())}>+</button>
      <button onClick={() => dispatch(decreasment())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default App;
