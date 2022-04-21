import AuthFormComponent from './auth.form';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class LoginFormComponent extends AuthFormComponent {
  @tracked email = '';
  @tracked password = '';
  @service auth;

  @action
  async submitForm(e) {
    this.resetForm(e);

    this.handleForm(async () =>
      this.auth.login({
        email: this.email,
        password: this.password,
      })
    );
  }
}
