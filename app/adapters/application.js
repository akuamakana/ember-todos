import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'ember-todos/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.API_URL;
}
