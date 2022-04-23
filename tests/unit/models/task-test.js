import { module, test } from 'qunit';
import { setupTest } from 'ember-todos/tests/helpers';

module('Unit | Model | task', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('task', {});
    assert.ok(model);
  });
});