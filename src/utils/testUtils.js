import toJson from 'enzyme-to-json';

export function afterPromises(done, fn) {
  setTimeout(() => {
    try {
      fn();
      done();
    } catch (e) {
      fail();
    }
  }, 1);
}

export function checkSnapshot(tree) {
  expect(toJson(tree)).toMatchSnapshot();
}