import { memo, useState } from 'react'
import { useTheme } from '../hooks/ContextProvide';


const Child = memo(() => {
    console.log("Child is rendered...");

    return (
        <>
            <h1>Child component</h1>
        </>
    )
})

const MemoImplemen = () => {
    const [name, setName] = useState("sudhanshu");

    const { theme, toggleTheme } = useTheme();

    const HandlerClick = () => {
        setName((prev) => prev === "sudhanshu" ? "Amit" : "sudhanshu");
    }
    return (
        <div>

            <h1>This is parent component</h1>
            <Child />
            <button onClick={HandlerClick}>{name}</button>
            <button onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </div>
    )
}

export default MemoImplemen
