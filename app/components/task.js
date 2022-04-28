import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TaskComponent extends Component {
  @service store;
  @tracked isHovered;

  @action
  toggleHover() {
    this.isHovered = !this.isHovered;
  }

  @action
  async toggleComplete(task_id) {
    const task = await this.store.findRecord('task', task_id);
    task.completed = !task.completed;
    task.save();
  }

  @action
  async deleteTask(task_id) {
    const task = this.store.peekRecord('task', task_id);
    task.destroyRecord();
  }
}
