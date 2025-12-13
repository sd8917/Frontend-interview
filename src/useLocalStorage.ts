import type React from "react";
import { useEffect, useState } from "react";

// Local storage state helper with JSON serialization
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            console.log('stored ', stored, " key ", key);
            return stored ? JSON.parse(stored) as T : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // ignore storage errors
        }
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;