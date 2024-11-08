import { authAPI } from '@/api/auth/auth.api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, PropsWithChildren } from 'react';

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isLogged: boolean;
  logout: () => void;
  getMe: () => void;
}

interface User {
  name: string;
  email: string;
  id: string;
}

export const authContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: authAPI.getUser,
    initialData: null,
  });

  const logout = () => {
    authAPI.logout().then(() => {
      queryClient.setQueryData(['user'], () => null);
    });
  };

  return (
    <authContext.Provider
      value={{
        isLogged: !!data,
        user: data,
        isError,
        isLoading,
        logout,
        getMe: () => refetch(),
      }}
    >
      {children}
    </authContext.Provider>
  );
}
