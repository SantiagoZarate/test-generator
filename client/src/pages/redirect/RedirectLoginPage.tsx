import { useAuth } from '@/hooks/useAuth';
import { useOauth } from '@/hooks/useOauth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectLoginPage() {
  const redirect = useNavigate();
  const { loginUser } = useOauth();
  const { getMe, isError, isLoading } = useAuth();

  useEffect(() => {
    loginUser().then(() => {
      setTimeout(() => {
        getMe();
        redirect('/');
      }, 5000);
    });
  }, []);

  return (
    <section>
      {isError && <div>Hubo un error</div>}
      {isLoading && <div>loading...</div>}
      {!isError && !isLoading && <h1>User logged in</h1>}
    </section>
  );
}
