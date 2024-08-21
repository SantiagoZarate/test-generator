import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("theme") !== undefined
  );

  useEffect(() => {
    isDark && document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);

    if (isDark) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "true");
    }
  };

  return {
    isDark,
    toggleTheme,
  };
}
