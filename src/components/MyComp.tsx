import {useEffect, useRef, useState} from 'react'

const MyComp = () => {

    const temp = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
       if (temp.current) {
         console.log("temp ", (temp.current as HTMLElement).innerText);
       }
    },[])
    console.log('temp ', temp);

   const focusInput = () => {
    console.log('called')
        if (inputRef.current) {
          console.log("focus ", inputRef.current)
        //   inputRef.current.focus();
        }
    };
  return (
    <div>
        <h1 ref={temp}>Hellow sudhanshu</h1>

        <input type='text' ref={inputRef} onFocus={focusInput}/>
      
    </div>
  )
}

export default MyComp
