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