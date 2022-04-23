import Service from '@ember/service';
import axiosInstance from '../utils/axiosInstance';
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
  login({ email, password }) {
    return axiosInstance.post('/user/login', {
      email,
      password,
    });
  }

  @action
  register({ name, email, password, age }) {
    return axiosInstance.post('/user/register', {
      email,
      name,
      age,
      password,
    });
  }

  @action
  logout() {
    return axiosInstance.post('/user/logout');
  }

  @action
  deleteUser() {
    return axiosInstance.delete('/user/me');
  }
}
