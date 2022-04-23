import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;
  inflector.uncountable('task');
}

export default {
  initialize,
};
