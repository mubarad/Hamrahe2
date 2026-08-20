import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { currentUser as mockCurrentUser } from "../data/mock-data";

interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  verified: boolean;
  isPremium?: boolean;
  identityVerified?: boolean;
  customUrl?: string;
  location?: string;
  connectionCount?: number;
  professionalScore?: number;
  responseRate?: number;
  responseTime?: string;
  workStatus?: string[];
  accountType?: "individual" | "company" | "startup";
}

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem("hamrahe_user");
    const storedTheme = localStorage.getItem("hamrahe_theme") as "light" | "dark" | null;
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem("hamrahe_user", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("hamrahe_user");
  };

  const handleSetTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("hamrahe_theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        theme,
        setTheme: handleSetTheme,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    // Return a default context instead of throwing to prevent render errors
    console.error("useApp must be used within AppProvider");
    return {
      currentUser: null,
      setCurrentUser: () => {},
      theme: "light" as const,
      setTheme: () => {},
      isAuthenticated: false,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
