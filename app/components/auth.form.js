import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class AuthFormComponent extends Component {
  @tracked error;
  @service router;
  @service cookies;
  @service store;

  resetForm(e) {
    e.preventDefault();
    this.error = null;
  }

  async updateError(error) {
    const message = await error.json();
    this.error = message;
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
