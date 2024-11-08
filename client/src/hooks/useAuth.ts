import { authContext } from '@/context/authContext';
import { useContext } from 'react';

export function useAuth() {
  const value = useContext(authContext);

  if (!value) {
    throw new Error('authContext must be used within authProvider component');
  }

  return value;
}
