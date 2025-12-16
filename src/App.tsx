import { Content } from "./components/Context";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/ThemeContext";
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}


export default App

