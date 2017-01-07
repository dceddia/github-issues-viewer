import { getIssues, getOpenIssueCount } from './index';
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

  it('parses response without a last page', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: 'the data',
        headers: {
          link: "<https://api.github.com/repositories/8514/issues?per_page=25&page=2>; rel=\"next\""
        }
      });
    };

    getIssues('rails', 'rails').then(issues => {
      expect(issues.data).toEqual('the data');
      expect(issues.pageCount).toEqual(0);
      expect(issues.pageLinks).toEqual({
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

describe('getOpenIssueCount', () => {
  it('handles successful responses', (done) => {
    axios.get = url => {
      return Promise.resolve({
        data: {
          open_issues_count: 42
        }
      });
    };

    getOpenIssueCount('rails', 'rails').then(count => {
      expect(count).toEqual(42);
      done();
    });
  });

  it('handles error responses', (done) => {
    axios.get = url => {
      return Promise.reject('terrible error');
    };

    getOpenIssueCount('rails', 'rails')
      .then(fail)
      .catch(count => {
        expect(count).toEqual(-1);
        done();
      });
  });
});