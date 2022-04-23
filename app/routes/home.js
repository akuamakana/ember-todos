import { service } from '@ember/service';
import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class HomeRoute extends Route {
  @service store;
  @service router;
  @service auth;
  @service cookies;

  // QUESTION: Why does peekRecord not work?
  // QUESTION: ID not working with store?
  model() {
    this.auth.checkLoggedIn();
    return this.store.queryRecord('user', {});
  }

  @action
  error() {
    this.cookies.clear('token');
    this.auth.checkLoggedIn();
    this.router.replaceWith('login');
  }
}
