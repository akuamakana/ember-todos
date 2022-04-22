import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthRoute extends Route {
  @service router;
  @service cookies;
  @service store;
  @tracked error;

  resetForm(e) {
    e.preventDefault();
    this.error = null;
  }

  async updateError(error) {
    console.log('handleForm');

    const message = await error.json();
    this.error = message;
    console.log(this.error);
  }

  async handleForm(fn) {
    const res = await fn();

    if (!res.ok) {
      return this.updateError(res);
    }

    const data = await res.json();

    this.cookies.write('token', data.token, {
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    this.store.createRecord('user', {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      age: data.user.age,
    });

    this.router.transitionTo('/');
  }
}
