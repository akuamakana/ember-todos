import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Service | auth', function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);
  const user = {
    email: 'test@test.com',
    name: 'qunit',
    age: 21,
    password: 'test',
  };

  test('it exists', function (assert) {
    let auth = this.owner.lookup('service:auth');
    assert.ok(auth);
  });

  test('isLoggedIn | updates with token', function (assert) {
    let auth = this.owner.lookup('service:auth');
    let cookies = this.owner.lookup('service:cookies');
    cookies.clear('token');
    assert.notEqual(auth.isLoggedIn, true);

    cookies.write('token', '123', {
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    auth.checkLoggedIn();
    assert.true(auth.isLoggedIn);
  });

  test('login | returns token', async function (assert) {
    let auth = this.owner.lookup('service:auth');

    let { data } = await auth.login(user);

    assert.strictEqual(data.token, `login${user.email}${user.password}`);
    assert.strictEqual(data.user.email, user.email);
    assert.strictEqual(data.token, `login${user.email}${user.password}`);
  });

  test('register | POSTs request to /user/register', async function (assert) {
    let auth = this.owner.lookup('service:auth');
    const { data } = await auth.register(user);

    assert.strictEqual(data.user.email, user.email);
    assert.strictEqual(data.user.name, user.name);
    assert.strictEqual(data.user.age, user.age);
    assert.strictEqual(
      data.token,
      `register${user.email}${user.password}${user.age}${user.name}`
    );
  });

  test('logout | POSTs request to /user/logout', async function (assert) {
    let auth = this.owner.lookup('service:auth');
    const { data } = await auth.logout();

    assert.strictEqual(data, 'Logged out');
  });

  test('deleteUser | DELETEs request to /user/me', async function (assert) {
    let auth = this.owner.lookup('service:auth');
    const { data } = await auth.deleteUser();

    assert.strictEqual(data, 'User Deleted');
  });
});

// TODO: Test model + error of home route
