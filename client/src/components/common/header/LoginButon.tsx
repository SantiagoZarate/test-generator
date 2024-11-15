import { Button } from '@/components/ui/Button';
import { envs } from '@/config/envs';

export function LoginButon() {
  const handleRedirectGoogle = () => {
    const state = window.crypto.randomUUID();
    localStorage.setItem('latestCSRFToken', state);

    const url = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&access_type=offline&state=${state}&redirect_uri=${window.location.origin}/redirect-login&client_id=${envs.CLIENT_ID}`;

    window.location.replace(url);
  };

  return (
    <Button
      onClick={handleRedirectGoogle}
      className="h-auto p-1 font-bold"
      type="button"
    >
      Sign in with
      <figure className="w-6">
        <img
          className="size-full"
          src="/images/google-icon.webp"
          alt="Google image logo"
        />
      </figure>
    </Button>
  );
}
