import  { memo, useCallback, useState } from 'react'


const Child = memo(({ onClick }: any) => {
  console.log("❌ Child re-rendered");
  return <button onClick={onClick}>Child Button</button>;
});


const UseCallback = () => {
    const [name, setName] = useState("sudhanshu");

    const HandlerClick = useCallback(() => {
        setName((prev) => prev === "sudhanshu" ? "Amit" :"sudhanshu");
    }, [])
    return (
        <div>

            <h1>This is parent component. {name}</h1>
            <Child onClick={HandlerClick} />
           
        </div>
    )
}

export default UseCallback
