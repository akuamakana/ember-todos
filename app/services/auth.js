import Service from '@ember/service';
import fetchInstance from '../utils/fetchInstance';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @service store;
  @service cookies;
  @tracked isLoggedIn;

  @action
  checkLoggedIn() {
    this.isLoggedIn = this.cookies.exists('token');
  }

  @action
  async login({ email, password }) {
    return fetchInstance(`/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  @action
  async register({ name, email, password, age }) {
    return fetchInstance('/user/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
        age,
      }),
    });
  }

  @action
  async logout() {
    return fetchInstance('/user/logout', {
      method: 'POST',
    });
  }

  @action
  async deleteUser() {
    return fetchInstance('/user/me', {
      method: 'DELETE',
    });
  }
}
