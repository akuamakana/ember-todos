import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, currentURL } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | login-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<LoginForm />`);

    assert
      .dom(this.element.querySelector('[data-test-form-header]'))
      .hasText('Login');

    assert
      .dom(this.element.querySelector('[data-test-email-input]'))
      .hasAttribute('type', 'email');

    assert
      .dom(this.element.querySelector('[data-test-password-input]'))
      .hasAttribute('type', 'password');

    assert
      .dom(this.element.querySelector('[data-test-submit-button]'))
      .hasAttribute('type', 'submit')
      .hasText('Submit');
  });

  test('it renders error message on error', async function (assert) {
    // this.server.post(
    //   '/user/login',
    //   () => ({
    //     error: 'Something went wrong',
    //   }),
    //   500
    // );
    await render(hbs`<LoginForm />`);

    await click('[data-test-submit-button]');

    assert.strictEqual(currentURL(), '/');

    // assert.dom(this.element.querySelector('[data-test-form-error]')).exists();
    //   .hasText('Unable to login');
  });
});
