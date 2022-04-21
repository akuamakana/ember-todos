import AuthFormComponent from './auth.form';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class RegisterFormComponent extends AuthFormComponent {
  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked age = '';
  @service auth;

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
