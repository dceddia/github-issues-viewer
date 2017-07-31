import { getIssues, getIssue, getRepoDetails } from './index';
import axios from 'axios';

describe('getIssues', () => {
  it('builds the url', (done) => {
    axios.get = url => {
      expect(url).toEqual('https://api.github.com/repos/foo/bar/issues?per_page=25&page=123');
      done();
      return Promise.resolve({data: {}, headers: {}});
    }
    getIssues('foo', 'bar', 123);
  });

  it('builds the url with a default page', (done) => {
    axios.get = url => {
      expect(url).toEqual('https://api.github.com/repos/foo/bar/issues?per_page=25&page=1');
      done();
      return Promise.resolve({data: {}, headers: {}});
    }
    getIssues('foo', 'bar');
  });

  it('parses successful response', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: 'the data',
        headers: {
          link: "<https://api.github.com/repositories/8514/issues?per_page=25&page=2>; rel=\"next\", <https://api.github.com/repositories/8514/issues?per_page=25&page=49>; rel=\"last\""
        }
      });
    };

    getIssues('rails', 'rails').then(issues => {
      expect(issues.data).toEqual('the data');
      expect(issues.pageCount).toEqual(49);
      expect(issues.pageLinks).toEqual({
        "last": {
          "page": "49",
          "per_page": "25",
          "rel": "last",
          "url": "https://api.github.com/repositories/8514/issues?per_page=25&page=49",
        },
        "next": {
          "page": "2",
          "per_page": "25",
          "rel": "next",
          "url": "https://api.github.com/repositories/8514/issues?per_page=25&page=2",
        }
      });
      done();
    });
  });

  it('returns correct pageCount on last page', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: 'the data',
        headers: {
          link: '<https://api.github.com/repositories/8514/issues?per_page=25&page=1>; rel="first", <https://api.github.com/repositories/8514/issues?per_page=25&page=48>; rel="prev"'
        }
      });
    };

    getIssues('rails', 'rails').then(issues => {
      try {
        expect(issues.data).toEqual('the data');
        expect(issues.pageCount).toEqual(49);
        expect(issues.pageLinks).toEqual({
          "first": {
            "page": "1",
            "per_page": "25",
            "rel": "first",
            "url": "https://api.github.com/repositories/8514/issues?per_page=25&page=1",
          },
          "prev": {
            "page": "48",
            "per_page": "25",
            "rel": "prev",
            "url": "https://api.github.com/repositories/8514/issues?per_page=25&page=48",
          }
        });
        done();
      } catch(e) {
        fail(e);
        done();
      }
    });
  });

  it('parses error responses', (done) => {
    const error = new Error('something bad');
    axios.get = url => {
      return Promise.reject(error);
    };

    getIssues('fail', 'fail')
      .then(fail)
      .catch((e) => {
        expect(e).toEqual(error);
        done();
      });
  });
});

describe('getRepoDetails', () => {
  it('builds the url', (done) => {
    axios.get = url => {
      expect(url).toEqual('https://api.github.com/repos/foo/bar');
      done();
      return Promise.resolve({});
    }
    getRepoDetails('foo', 'bar');
  });

  it('handles successful responses', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: {
          open_issues_count: 42
        }
      });
    };

    getRepoDetails('rails', 'rails').then(count => {
      expect(count).toEqual({open_issues_count: 42});
      done();
    });
  });

  it('handles error responses', (done) => {
    axios.get = url => {
      return Promise.reject('terrible error');
    };

    getRepoDetails('rails', 'rails')
      .then(fail)
      .catch(count => {
        expect(count).toEqual(-1);
        done();
      });
  });
});

describe('getIssue', () => {
  const issue = {number: 1234, body: 'something'};

  it('builds the url', (done) => {
    axios.get = url => {
      expect(url).toEqual('https://api.github.com/repos/foo/bar/issues/123');
      done();
      return Promise.resolve({});
    }
    getIssue('foo', 'bar', 123);
  });

  it('handles successful responses', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: issue
      });
    };

    getIssue('rails', 'rails', 1234).then(data => {
      expect(data).toEqual(issue);
      done();
    }).catch(fail);
  });

  it('handles error responses', (done) => {
    const error = new Error('terrible error');
    axios.get = url => {
      return Promise.reject(error);
    };

    getIssue('rails', 'rails', 1234)
      .then(fail)
      .catch(err => {
        expect(err).toEqual(error);
        done();
      });
  });
});
