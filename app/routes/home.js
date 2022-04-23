import { service } from '@ember/service';
import Route from '@ember/routing/route';
// import { action } from '@ember/object';
import RSVP from 'rsvp';

export default class HomeRoute extends Route {
  @service store;
  @service router;
  @service auth;
  @service cookies;

  // QUESTION: Why does peekRecord not work?
  // QUESTION: ID not working with store?
  model() {
    this.auth.checkLoggedIn();
    return RSVP.hash({
      tasks: this.store.findAll('task'),
      user: this.store.queryRecord('user', {}),
    });
  }

  // @action
  // error() {
  //   // this.cookies.clear('token');
  //   this.auth.checkLoggedIn();
  //   // this.router.replaceWith('login');
  // }
}
