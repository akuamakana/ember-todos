import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'ember-todos/config/environment';
import { service } from '@ember/service';

export default class UserAdapter extends RESTAdapter {
  host = ENV.API_URL;
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
