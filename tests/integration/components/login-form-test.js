import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { getCookie } from '../../test_utils/getCookie';
import { transitionSpy, RouterStub } from '../../test_utils/routerStub';

module('Integration | Component | login-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    transitionSpy.resetHistory();
    this.owner.register('service:router', RouterStub);
  });

  test('it renders', async function (assert) {
    await render(hbs`<LoginForm />`);

    assert
      .dom(this.element.querySelector('[data-test-form-header]'))
      .hasText('Login');

    assert
      .dom(this.element.querySelector('[data-test-email-label]'))
      .hasText('Email');

    assert
      .dom(this.element.querySelector('[data-test-email-input]'))
      .hasAttribute('type', 'email');

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
    this.server.post('/user/login', () => 'Unable to login', 400);
    await render(hbs`<LoginForm />`);

    await click('[data-test-submit-button]');

    assert
      .dom(this.element.querySelector('[data-test-form-error]'))
      .hasText('Unable to login');
  });

  test('it redirects to / page on success', async function () {
    await render(hbs`<LoginForm />`);

    await fillIn('[data-test-email-input]', 'test@test.com');
    await fillIn('[data-test-password-input]', 'test');
    await click('[data-test-submit-button]');

    assert.equal(
      getCookie('token'),
      'logintest@test.comtest',
      'token is set as cookie'
    );
    assert.ok(
      transitionSpy.calledOnceWith('/'),
      'transitionTo called once with "/"'
    );
  });
});
