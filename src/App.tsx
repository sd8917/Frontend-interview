
import Autocomplete from "./components/AutoComplete"
import EventVisualDemo from "./components/EventDemo";
import MemoImplemen from "./components/MemoImplemen"
import UseCallback from "./components/UseCallback"
import { ThemeContextProvider } from "./hooks/ContextProvide"
import './styles.css';

const App = () => {

  return (
    <>
      {/* <ThemeContextProvider>
        <MemoImplemen />
      </ThemeContextProvider> */}
      <EventVisualDemo />

    </>
  )
}

export default App
