import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') description;
  @attr('boolean') completed;

  get completedTasks() {
    return this.completed;
  }
}
