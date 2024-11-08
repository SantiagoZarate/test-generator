import { useOauth } from '@/hooks/useOauth';

export function RedirectLoginPage() {
  const { loginUser } = useOauth();
  loginUser();

  return (
    <section>
      <h1>User logged in</h1>
    </section>
  );
}
