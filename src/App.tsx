
import Autocomplete from "./components/AutoComplete"
import MemoImplemen from "./components/MemoImplemen"
import UseCallback from "./components/UseCallback"
import { ThemeContextProvider } from "./hooks/ContextProvide"
import './styles.css';

const App = () => {

  return (
    <>
      <ThemeContextProvider>
        <MemoImplemen />
      </ThemeContextProvider>

    </>
  )
}

export default App
