"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  userId: string | null;
  isLoggedIn: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    setIsLoading(false);
  }, []);

  const login = (id: string) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn: !!userId, login, logout }}>
      {/* WE REMOVED THE TOP-LEVEL 'IF' BLOCK.
          Now the Provider is always present, so useAuth() won't throw an error.
          We only hide the children (like the Navbar content) until we know the auth status.
      */}
      {!isLoading ? children : null} 
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}