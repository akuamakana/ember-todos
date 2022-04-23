import JSONSerializer from '@ember-data/serializer/json-api';

export default class ApplicationSerializer extends JSONSerializer {
  primaryKey = '_id';
}
