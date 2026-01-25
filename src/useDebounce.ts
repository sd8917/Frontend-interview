import  { useEffect, useState } from 'react'

const useDebounce = ({value, delay}: any) => {

    const [debounceValue, setDebounceValue] = useState(null);

    useEffect(()=>{

        const id = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        // clear your timers.

        return () => clearTimeout(id);
    })

    return debounceValue;
}

export default useDebounce;