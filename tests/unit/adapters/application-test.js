import { module, test } from 'qunit';
import { setupTest } from 'ember-todos/tests/helpers';
import ENV from 'ember-todos/config/environment';

module('Unit | Adapter | application', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let adapter = this.owner.lookup('adapter:application');
    assert.ok(adapter);
  });

  test('it has baseUrl set', async function (assert) {
    const adapter = this.owner.lookup('adapter:application');
    assert.strictEqual(adapter.baseURL, ENV.APP.API_HOST, 'baseURL is set');
  });
});
