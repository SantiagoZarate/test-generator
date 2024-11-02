/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export function useTheme() {
  const getInitialTheme = () => {
    // Check localStorage for user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    // Check system preference if no preference is saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);

    if (isDark) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', 'true');
    }
  };

  return {
    isDark,
    toggleTheme,
  };
}
