import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class FormComponent extends Component {
  @tracked error;

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

    // Do next fn() or route?
  }

  // async handleError() {}

  // async handleSuccess() {}
}
