import FormComponent from './form';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import axiosInstance from '../utils/axiosInstance';

export default class RegisterFormComponent extends FormComponent {
  @tracked name;
  @tracked email;
  @tracked password;
  @tracked age;
  @service auth;
  @service router;
  @service cookies;
  @service store;

  async handleForm(fn) {
    try {
      const { data } = await fn();

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
    } catch (e) {
      return this.updateError(e.response.data);
    }
  }

  @action
  async submitForm(e) {
    this.resetForm(e);

    this.handleForm(async () =>
      axiosInstance.post('/user/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        age: this.age,
      })
    );
  }
}
