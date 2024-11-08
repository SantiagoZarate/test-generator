import { useOauth } from '@/hooks/useOauth';

export function RedirectLoginPage() {
  useOauth('/api/auth/login?code=');

  return (
    <section>
      <h1>User logged in</h1>
    </section>
  );
}
