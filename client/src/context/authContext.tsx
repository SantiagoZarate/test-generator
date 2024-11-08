import { authAPI } from '@/api/auth/auth.api';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

interface AuthContextProps {
  user: string | null;
  isLogged: boolean;
  logout: () => void;
  login: () => void;
}

export const authContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    login();
  }, []);

  const logout = () => {
    authAPI.logout().then(() => {
      setUser(null);
    });
  };

  const login = () => {
    authAPI.getUser().then((response) => {
      setUser(response.data.name);
    });
  };

  return (
    <authContext.Provider
      value={{
        isLogged: user !== null,
        user,
        logout,
        login,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
