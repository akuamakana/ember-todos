import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { transitionSpy, RouterStub } from '../../test_utils/routerStub';
import { getCookie } from '../../test_utils/getCookie';

module('Integration | Component | register-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    transitionSpy.resetHistory();
    this.owner.register('service:router', RouterStub);
  });

  test('it renders', async function (assert) {
    await render(hbs`<RegisterForm />`);

    assert
      .dom(this.element.querySelector('[data-test-form-header]'))
      .hasText('Register');

    assert
      .dom(this.element.querySelector('[data-test-email-label]'))
      .hasText('Email');

    assert
      .dom(this.element.querySelector('[data-test-email-input]'))
      .hasAttribute('type', 'email');

    assert
      .dom(this.element.querySelector('[data-test-name-label]'))
      .hasText('Name');

    assert
      .dom(this.element.querySelector('[data-test-name-input]'))
      .hasAttribute('type', 'text');

    assert
      .dom(this.element.querySelector('[data-test-age-label]'))
      .hasText('Age');

    assert
      .dom(this.element.querySelector('[data-test-age-input]'))
      .hasAttribute('type', 'number');

    assert
      .dom(this.element.querySelector('[data-test-password-label]'))
      .hasText('Password');

    assert
      .dom(this.element.querySelector('[data-test-password-input]'))
      .hasAttribute('type', 'password');

    assert
      .dom(this.element.querySelector('[data-test-submit-button]'))
      .hasAttribute('type', 'submit')
      .hasText('Submit');
  });

  test('it renders error message on error', async function (assert) {
    this.server.post('/user/register', () => 'Unable to register', 400);
    await render(hbs`<RegisterForm />`);

    await click('[data-test-submit-button]');

    assert
      .dom(this.element.querySelector('[data-test-form-error]'))
      .hasText('Unable to register');
  });

  test('it redirects to /home page on success', async function () {
    const user = {
      email: 'test@test.com',
      name: 'qunit',
      age: 21,
      password: 'test',
    };

    await render(hbs`<RegisterForm />`);

    await fillIn('[data-test-email-input]', user.email);
    await fillIn('[data-test-name-input]', user.name);
    await fillIn('[data-test-age-input]', user.age);
    await fillIn('[data-test-password-input]', user.password);
    await click('[data-test-submit-button]');

    assert.equal(
      getCookie('token'),
      `register${user.email}${user.password}${user.age}${user.name}`,
      'token is set as cookie'
    );

    assert.ok(
      transitionSpy.calledOnceWith('/'),
      'transitionTo called once with "/"'
    );
  });
});
