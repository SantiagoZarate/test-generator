import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthAEndpoints = '/api/auth/login?code=' | '/api/auth/register?code="';

export function useOauth(apiUrl: AuthAEndpoints) {
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

    const settings: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    fetch(apiUrl + code, settings)
      .then((response) => response.json())
      .then(() => {
        setTimeout(() => {
          redirect('/');
        }, 5000);
      })
      .catch(() => {
        console.error('Login failed');
      });
  }, []);

  return {};
}
