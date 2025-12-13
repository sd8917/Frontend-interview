/*
- Create a search box that:
- Calls API after user stops typing (300ms)
- Cancels previous requests
- Shows loading indicator


*/

import { useEffect, useState, useMemo } from "react"

const useDebounce = (searchTerm: any, delay=300) =>{
    // ✅ Initialize with actual searchTerm (not empty string)
    const [debouncedValue, setDebouncedValue] = useState(searchTerm);

    useEffect(()=>{
       const timer = setTimeout(() => {
        setDebouncedValue(searchTerm);
        }, delay);

        // ✅ cleanup → cancels previous timer
        return () => clearTimeout(timer);
    },[searchTerm, delay])

    // ✅ Memoize return value to prevent unnecessary re-renders
    return useMemo(() => debouncedValue, [debouncedValue])
}

export default useDebounce