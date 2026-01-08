import  { memo, useState } from 'react'


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

    const HandlerClick = () => {
        setName((prev) => prev === "sudhanshu" ? "Amit" :"sudhanshu");
    }
    return (
        <div>

            <h1>This is parent component</h1>
            <Child />
            <button onClick={HandlerClick}>{name}</button>
        </div>
    )
}

export default MemoImplemen
