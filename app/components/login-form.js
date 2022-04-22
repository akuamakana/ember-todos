import RegisterFormComponent from './register-form';
import { action } from '@ember/object';

export default class LoginFormComponent extends RegisterFormComponent {
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
