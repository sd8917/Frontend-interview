import { useEffect, useState } from "react";

function useWindowSize(){
    const [size, setSize] = useState(window.innerWidth);

    useEffect(()=>{
        function handler(){
            setSize(window.innerWidth);
        }

        window.addEventListener("resize", handler);

        return () => window.removeEventListener("resize", handler);
    }, [])

    return size;
}

export default useWindowSize;