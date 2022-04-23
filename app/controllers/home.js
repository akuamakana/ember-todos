import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service store;
  @tracked description;
  @tracked tasks = [];

  @action
  submitForm(e) {
    console.log('Create Task');
    e.preventDefault();

    const task = this.store.createRecord('task', {
      description: this.description,
    });

    task.save();
  }

  @action
  getTasks() {
    console.log('Get Tasks');

    this.tasks = this.store.findAll('task');

    console.log(this.tasks);
  }
}
