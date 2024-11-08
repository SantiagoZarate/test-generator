import { Button } from '@/components/ui/Button';
import { envs } from '@/config/envs';

export function RegisterButton() {
  const handleRedirectGoogle = () => {
    const state = window.crypto.randomUUID();
    localStorage.setItem('latestCSRFToken', state);

    const url = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/cloud-platform&response_type=code&access_type=offline&state=${state}&redirect_uri=${window.location.origin}/redirect&client_id=${envs.CLIENT_ID}`;

    window.location.replace(url);
  };

  return <Button onClick={handleRedirectGoogle}>register</Button>;
}
