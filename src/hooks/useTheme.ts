import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";


// 3️⃣ Custom Hook (BEST PRACTICE)
export function useTheme() {
    const context = useContext(ThemeContext);
    console.log('context ', context);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
}