import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function RedirectPage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const state = queryParams.get('state');
  const code = queryParams.get('code');

  const storedState = localStorage.getItem('latestCSRFToken');

  useEffect(() => {
    if (storedState !== state) {
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

    fetch('/api/auth/register?code=' + code, settings)
      .then((response) => response.json())
      .catch(() => {
        console.log('No anda el backend');
      });
  }, []);

  return <section>LOGGED IN</section>;
}
