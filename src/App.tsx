import { useLayoutEffect, useEffect } from "react";


function App() {
  console.log("render");

  useLayoutEffect(() => {
    console.log("layout");
  }, []);

  useEffect(() => {
    console.log("effect");
  }, []);

  return <div />;

}



export default App

