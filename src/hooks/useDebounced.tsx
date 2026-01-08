import React, { useEffect, useState } from 'react'

type DebounceObj = {
    value: string,
    delay: number,
}
const useDebounced = ({value, delay}: DebounceObj) => {

    const [debouncedValue, setDebouncedValue]= useState('');

    useEffect(()=>{
         const timerId  = setTimeout(() => {
            
        }, delay);
      
        return () => clearTimeout(timerId);
    },[delay])
  
    return debouncedValue;
}

export default useDebounced
