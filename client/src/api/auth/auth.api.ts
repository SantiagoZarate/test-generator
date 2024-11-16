import { AuthAPI } from '.';

const ENDPOINT = '/api/auth';

const authAPI: AuthAPI = {
  async googleRegister(code: string) {
    authRequest(ENDPOINT + '/google/register?code=' + code)
      .then((response) => response.json())
      .catch(() => {
        console.error('Login failed');
      });
  },
  async googleLogin(code: string) {
    authRequest(ENDPOINT + '/google/login?code=' + code)
      .then((response) => response.json())
      .catch(() => {
        console.error('Login failed');
      });
  },
  async logout() {
    return fetch(ENDPOINT + '/logout', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));
  },
  async login(data) {
    return fetch(ENDPOINT + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
  async register(data) {
    return fetch(ENDPOINT + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
  async getUser() {
    return fetch(ENDPOINT + '/me', {
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          return null;
        }

        return response.json().then((res) => {
          return res.data;
        });
      })
      .catch((e) => {
        console.log(e);
        console.log('RUNNING');

        return null;
      });
  },
};

function authRequest(url: string) {
  const settings: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  return fetch(url, settings);
}

export { authAPI };
