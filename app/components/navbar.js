import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @service cookies;
  @service auth;
  @service router;

  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }

  @action
  logout(e) {
    e.preventDefault();
    this.auth.logout();
    this.cookies.clear('token');
    this.auth.checkLoggedIn();
    this.router.transitionTo('login');
  }
}
