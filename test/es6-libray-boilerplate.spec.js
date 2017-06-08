import sayHello from '../src/es6-libray-boilerplate';

const HELLO = 'hello';

describe('say hello', () => {
  it('should say hello', function () {
    expect(sayHello()).toMatch(HELLO);
  });
});
