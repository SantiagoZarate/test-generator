import { redirect } from 'react-router-dom';

const ENDPOINT = '/api/auth';

const authAPI = {
  async register(code: string) {
    authRequest(ENDPOINT + '/register?code=' + code)
      .then((response) => response.json())
      .catch(() => {
        console.error('Login failed');
      });
  },
  async login(code: string) {
    authRequest(ENDPOINT + '/login?code=' + code)
      .then((response) => response.json())
      .then(() => {
        setTimeout(() => {
          redirect('/');
        }, 5000);
      })
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
  async getUser() {
    return fetch(ENDPOINT + '/me', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .catch((e) => console.log(e));
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
