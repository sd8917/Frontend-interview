import { createContext, useMemo, useState } from "react";
import { type ReactNode } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};
// 1️⃣ Create Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


type ThemeProviderProps = {
    children: ReactNode;
};

// 2️⃣ Theme Provider
export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<string>("light");

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

     // memoize the value object
    const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <div
                className={theme === "light" ? "bg-white text-black !important" : "bg-black text-white !important"}
                style={{ minHeight: "100vh", width: "100vw" }}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}