import RESTSerializer from '@ember-data/serializer/rest';
// import ApplicationSerializer from './application';

export default class TaskSerializer extends RESTSerializer {
  primaryKey = '_id';

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
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
    payload.tasks = payload.data;
    delete payload.data;
    return super.normalizeFindAllResponse(store, primaryModelClass, payload);
  }
}
