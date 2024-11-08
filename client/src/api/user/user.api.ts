import { UserAPI } from '.';

const ENDPOINT = '/api/user';

const userAPI: UserAPI = {
  async getUserProfile() {
    return fetch(ENDPOINT + '/profile', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((response) => response.data);
  },
};

export { userAPI };
