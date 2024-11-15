import { authAPI } from '@/api/auth/auth.api';
import { useEffect } from 'react';
import { redirect, useLocation } from 'react-router-dom';

export function useOauth() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const state = queryParams.get('state');
  const code = queryParams.get('code');

  const storedState = localStorage.getItem('latestCSRFToken');

  useEffect(() => {
    if (storedState !== state) {
      console.error('Invalid CSRF token');
      return;
    }

    if (!code) {
      throw new Error('Code must be provided');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = () => {
    authAPI.googleRegister(code!).then(() => {
      setTimeout(() => {
        redirect('/');
      }, 5000);
    });
  };

  const loginUser = () => {
    return authAPI.googleLogin(code!);
  };

  return {
    registerUser,
    loginUser,
  };
}
