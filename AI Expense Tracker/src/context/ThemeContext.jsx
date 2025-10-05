import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Initialize state directly from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('finsight-theme');
    return savedTheme === 'dark';
  });

  // Apply theme class to document on mount and when theme changes
  useEffect(() => {
    console.log('Applying theme:', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('finsight-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('finsight-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('Toggle clicked! Current:', isDarkMode, '→ New:', !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
