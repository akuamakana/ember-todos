import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TaskComponent extends Component {
  @service store;

  @action
  async toggleComplete(task_id) {
    const task = await this.store.findRecord('task', task_id);
    task.completed = !task.completed;
    task.save();
  }
}
