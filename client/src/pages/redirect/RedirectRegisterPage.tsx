import { useOauth } from '@/hooks/useOauth';

export function RedirectRegisterPage() {
  const { registerUser } = useOauth();
  registerUser();

  return (
    <section>
      <h1>Registered</h1>
      <p>Youre gonna be redirect to the home...</p>
    </section>
  );
}
