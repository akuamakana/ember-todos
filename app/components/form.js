import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class FormComponent extends Component {
  @tracked error;

  resetForm(e) {
    e.preventDefault();
    this.error = null;
  }

  async updateError(error) {
    this.error = error;
  }

  async handleForm(fn) {
    const res = await fn();

    if (!res.ok) {
      // this.handleError()
      return this.updateError(res);
    }
    // this.handleSuccess()
  }

  // async handleError() {}

  // async handleSuccess() {}
}
