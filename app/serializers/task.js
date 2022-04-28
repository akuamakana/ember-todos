import RESTSerializer from '@ember-data/serializer/rest';

export default class TaskSerializer extends RESTSerializer {
  primaryKey = '_id';

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload.task = payload.data;

    return super.normalizeResponse(
      store,
      primaryModelClass,
      payload,
      id,
      requestType
    );
  }

  normalizeFindAllResponse(store, primaryModelClass, payload) {
    delete payload.count;
    Object.assign(payload, {
      tasks: payload.data,
    });
    payload.tasks = payload.data;
    delete payload.data;
    return super.normalizeFindAllResponse(store, primaryModelClass, payload);
  }

  normalizeCreateRecordResponse(store, primaryModelClass, payload) {
    const task = {
      task: payload.data.data,
    };

    return super.normalizeCreateRecordResponse(store, primaryModelClass, task);
  }

  normalizeUpdateRecordResponse(store, primaryModelClass, payload) {
    // QUESTION: When does modelNameFromPayloadKey get called?
    const task = {
      task: payload.data.data,
    };

    return super.normalizeCreateRecordResponse(store, primaryModelClass, task);
  }
}
