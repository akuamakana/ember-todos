import ApplicationAdapter from './application';
import { service } from '@ember/service';

export default class UserAdapter extends ApplicationAdapter {
  @service cookies;

  get headers() {
    return {
      Authorization: `Bearer ${this.cookies.read('token')}`,
      'Content-Type': 'application/json',
    };
  }

  urlForQueryRecord() {
    let baseUrl = this.buildURL();
    return `${baseUrl}/user/me`;
  }
}
