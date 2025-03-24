import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  themeDescription: string;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  themeDescription: "Night Mode",
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

const ThemeProvider = ({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || defaultTheme;
  });

  const [themeDescription, setThemeDescription] = useState(() => {
    return theme === "dark" ? "Night Mode" : "Sunlight Mode";
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("theme", theme);

    // Update document class for global styling
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Update theme description
    setThemeDescription(theme === "dark" ? "Night Mode" : "Sunlight Mode");

    // Add a transition class for smooth animation
    root.classList.add("theme-transition");

    // Announce theme change for accessibility
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("class", "sr-only");
    announcement.textContent = `Theme changed to ${themeDescription}`;
    document.body.appendChild(announcement);

    // Clean up announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [theme, themeDescription]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const value = {
    theme,
    toggleTheme,
    themeDescription,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
