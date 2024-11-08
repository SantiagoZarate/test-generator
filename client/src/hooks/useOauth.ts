import { authAPI } from '@/api/auth/auth.api';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useOauth() {
  const location = useLocation();
  const redirect = useNavigate();

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
  }, []);

  const registerUser = () => {
    authAPI.register(code!).then(() => {
      setTimeout(() => {
        redirect('/');
      }, 5000);
    });
  };

  const loginUser = () => {
    authAPI.login(code!).then(() => {
      setTimeout(() => {
        redirect('/');
      }, 5000);
    });
  };

  return {
    registerUser,
    loginUser,
  };
}
