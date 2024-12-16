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
        window.location.reload();
      }, 5000);
    });
  }, []);

  return (
    <section>
      {isError && <div>Hubo un error</div>}
      {isLoading && <div>loading...</div>}
      {!isError && !isLoading && (
        <section className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-semibold">Logged in!</h1>
          <p className="text-sm">Redirecting user to home page...</p>
        </section>
      )}
    </section>
  );
}
