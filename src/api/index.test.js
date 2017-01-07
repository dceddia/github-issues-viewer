import { getIssues, getRepoDetails } from './index';
import axios from 'axios';

describe('getIssues', () => {
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
    axios.get = url => {
      return Promise.reject('an error');
    };
    
    getIssues('fail', 'fail')
      .then(fail)
      .catch((e) => {
        expect(e).toEqual({
          pageLinks: {},
          pageCount: 0,
          data: [],
          error: 'an error'
        });
        done();
      });
  });
});

describe('getRepoDetails', () => {
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