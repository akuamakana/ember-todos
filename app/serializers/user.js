import JSONSerializer from '@ember-data/serializer/json';

export default class UserSerializer extends JSONSerializer {
  primaryKey = '_id';
}
