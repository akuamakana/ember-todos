import FormComponent from './form';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class RegisterFormComponent extends FormComponent {
  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked age = '';
  @service auth;
  @service router;
  @service cookies;
  @service store;

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

  @action
  async submitForm(e) {
    this.resetForm(e);

    this.handleForm(async () =>
      this.auth.register({
        name: this.name,
        email: this.email,
        password: this.password,
        age: this.age,
      })
    );
  }
}
