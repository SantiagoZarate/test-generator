import { envs } from '../../config/envs';
import { ScopeData } from '../types/auth/scopeData.types';
import { GoogleCode } from '../types/googleCodeResponse.types';

class AuthService {
  async getAccesToken(code: string) {
    const url = 'https://accounts.google.com/o/oauth2/token';
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: envs.CLIENT_ID,
      client_secret: envs.CLIENT_SECRET,
      redirect_uri: 'http://localhost:7000/redirect',
    }).toString();

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };

    const res = await fetch(url, options)
      .then((response) => response.json())
      .then((response: GoogleCode) => response);

    const userInfoUrl = `https://www.googleapis.com/oauth2/v3/userinfo`;
    const userInfo: ScopeData = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${res.access_token}`,
      },
    }).then((response) => response.json());

    console.log(userInfo);
  }
}

export const authService = new AuthService();
