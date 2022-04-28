import { Factory } from 'miragejs';

export default Factory.extend({
  description(i) {
    return `Task ${i}`;
  },

  completed(i) {
    return i % 2 === 0;
  },
});
