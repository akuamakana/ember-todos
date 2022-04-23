import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class RegisterRoute extends Route {
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
