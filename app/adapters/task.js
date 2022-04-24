import axiosInstance from '../utils/axiosInstance';
import ApplicationAdapter from './application';

export default class TaskAdapter extends ApplicationAdapter {
  createRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });

    return axiosInstance.post('/task', data);
  }

  updateRecord(store, type, snapshot) {
    let data = this.serialize(snapshot, { includeId: true });

    return axiosInstance.put(`/task/${data._id}`, {
      completed: data.completed,
    });
  }
}
