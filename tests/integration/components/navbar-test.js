import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

module('Integration | Component | navbar', function (hooks) {
  setupRenderingTest(hooks);
  class AuthStub extends Service {
    isLoggedIn = true;
  }

  test('it renders', async function (assert) {
    await render(hbs`<Navbar />`);

    assert
      .dom(this.element.querySelector('[data-test-nav-link="home"]'))
      .hasText('Home');

    assert
      .dom(this.element.querySelector('[data-test-nav-link="register"]'))
      .hasText('Register');

    assert
      .dom(this.element.querySelector('[data-test-nav-link="login"]'))
      .hasText('Login');
  });

  test('it renders logout if logged in', async function (assert) {
    this.owner.register('service:auth', AuthStub);
    await render(hbs`<Navbar />`);

    assert
      .dom(this.element.querySelector('[data-test-nav-link="logout"]'))
      .hasText('Logout');
  });
});
