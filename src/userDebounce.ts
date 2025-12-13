

import { useEffect, useState, useMemo } from "react"

const useDebounce = (searchTerm: any, delay=300) =>{
    // ✅ Initialize with actual searchTerm (not empty string)
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(()=>{
       const timer = setTimeout(() => {
        setDebouncedValue(searchTerm);
        }, delay);

        // ✅ cleanup → cancels previous timer if value changes before delay
        return () => clearTimeout(timer);
    },[searchTerm, delay])

    // ✅ Memoize return value to prevent unnecessary re-renders of child components
    return useMemo(() => debouncedValue, [debouncedValue])
}

export default useDebounce