import { module, test } from 'qunit';
import { setupTest } from 'ember-todos/tests/helpers';

module('Unit | Serializer | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('user');

    assert.ok(serializer);
  });

  test('it serializes records', function (assert) {
    const user = {
      email: 'test@test.com',
      name: 'qunit',
      age: 21,
      password: 'test',
    };

    let store = this.owner.lookup('service:store');
    let record = store.createRecord('user', {
      id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
