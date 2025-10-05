import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('finsight-theme');
    
    console.log('Theme initialization - saved theme:', savedTheme);
    
    // Apply saved theme or default to light
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      console.log('Applying saved dark theme');
    } else {
      // Default to light mode if no preference saved
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      if (!savedTheme) {
        localStorage.setItem('finsight-theme', 'light');
      }
      console.log('Applying light theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    
    console.log('Toggle clicked! Current:', isDarkMode, '→ New:', newTheme);
    
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('finsight-theme', 'dark');
      console.log('✅ Switched to DARK mode');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('finsight-theme', 'light');
      console.log('✅ Switched to LIGHT mode');
    }
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
