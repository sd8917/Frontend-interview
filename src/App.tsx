
import Autocomplete from "./components/AutoComplete"
import EventVisualDemo from "./components/EventDemo";
import MemoImplemen from "./components/MemoImplemen"
import TodoApp from "./components/TodoApp";
import UseCallback from "./components/UseCallback"
import { ThemeContextProvider } from "./hooks/ContextProvide"
import './styles.css';

const App = () => {

  return (
    <>
      {/* <ThemeContextProvider>
        <MemoImplemen />
      </ThemeContextProvider> */}
      <TodoApp />

    </>
  )
}

export default App
