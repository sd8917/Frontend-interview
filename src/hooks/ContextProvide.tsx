import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

//1. create context and initial with null
const ThemeContext = createContext<ThemeContextType | null>(null);


// 2. provider with child as props..

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

    }, [theme]);



    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };


    return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    )
}

// custom hook (best practice)
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};