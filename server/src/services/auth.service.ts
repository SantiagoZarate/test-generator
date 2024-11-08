import { envs } from '../../config/envs';
import { ScopeData } from '../types/auth/scopeData.types';
import { GoogleCode } from '../types/googleCodeResponse.types';

class AuthService {
  async getAccesToken(
    code: string,
    redirect_uri: string = 'http://localhost:7000/redirect',
  ): Promise<GoogleCode> {
    const url = 'https://accounts.google.com/o/oauth2/token';
    const body = new URLSearchParams({
      client_secret: envs.CLIENT_SECRET,
      grant_type: 'authorization_code',
      client_id: envs.CLIENT_ID,
      redirect_uri,
      code: code,
    }).toString();

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    };
    const res = await fetch(url, options).then((response) => response.json());

    return res;
  }

  async getUserInfo(token: string): Promise<ScopeData> {
    const userInfoUrl = `https://www.googleapis.com/oauth2/v3/userinfo`;

    const userInfo: ScopeData = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());

    return userInfo;
  }
}

export const authService = new AuthService();
