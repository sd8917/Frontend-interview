import { useTheme } from "../hooks/useTheme";

export function Header() {
    const { theme, toggleTheme } = useTheme();


    return (
        <header style={{ padding: "16px" }}>
            <h2>Current Theme: {theme}</h2>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
    );
}