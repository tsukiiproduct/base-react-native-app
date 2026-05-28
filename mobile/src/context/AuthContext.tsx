// Minimal auth + bootstrap state. No real auth — just flags that control
// which subtree RootNavigator renders.

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isBootstrapping: true,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Simulated startup work (load token, hydrate settings, etc.). Real apps
  // do this here and flip the flag when finished.
  useEffect(() => {
    const t = setTimeout(() => setIsBootstrapping(false), 800);
    return () => clearTimeout(t);
  }, []);

  const signIn = useCallback(() => setIsAuthenticated(true), []);
  const signOut = useCallback(() => setIsAuthenticated(false), []);

  const value = useMemo(
    () => ({ isAuthenticated, isBootstrapping, signIn, signOut }),
    [isAuthenticated, isBootstrapping, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
