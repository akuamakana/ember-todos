import Service from '@ember/service';
import sinon from 'sinon';

export const transitionSpy = sinon.spy();
export class RouterStub extends Service {
  transitionTo = (url) => transitionSpy(url);
}
