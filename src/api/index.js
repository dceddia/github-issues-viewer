import axios from 'axios';
import parseLink from 'parse-link-header';
import MockAxios from 'axios-mock-adapter';
import page1 from '../fixtures/issues/page1';
import page2 from '../fixtures/issues/page2';
import page3 from '../fixtures/issues/page3';
import page49 from '../fixtures/issues/page49';
import comments from '../fixtures/comments';

const USE_STATIC_DATA = false;

if(USE_STATIC_DATA) {
  let mock = new MockAxios(axios);

  mock.onGet('https://api.github.com/repos/rails/rails/issues?per_page=25&page=1')
    .reply(200, page1.data, {link: page1.link});
  mock.onGet('https://api.github.com/repos/rails/rails/issues?per_page=25&page=2')
    .reply(200, page2.data, {link: page2.link});
  mock.onGet('https://api.github.com/repos/rails/rails/issues?per_page=25&page=3')
    .reply(200, page3.data, {link: page3.link});
  mock.onGet('https://api.github.com/repos/rails/rails/issues?per_page=25&page=49')
    .reply(200, page49.data, {link: page49.link});
  mock.onGet(/issues\/404$/).reply(404);
  mock.onGet(/issues\/slow$/).reply(function(config) {
    return new Promise((resolve, reject) => {
      resolve([200, page1.data, {link: page1.link}]);
    });
  });
mock.onGet(/issues\/99$/)
    .reply(config => {
      const number = config.url.match(/issues\/(\d+)/)[1];
      const issue = {
        ...page1.data[0],
        number,
        comments: 0
      };
      return [200, issue];
    });
  mock.onGet(/issues\/\d+$/)
    .reply(config => {
      const number = config.url.match(/issues\/(\d+)/)[1];
      const issue = {
        ...page1.data[0],
        number
      };
      return [200, issue];
    });
  mock.onGet(/issues\/\d+\/comments$/)
    .reply(200, comments);
}

const isLastPage = (pageLinks) => {
  return Object.keys(pageLinks).length === 2 &&
    pageLinks.first && pageLinks.prev;
}

const getPageCount = (pageLinks) => {
  if(!pageLinks) {
    return 0;
  }
  if(isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if(pageLinks.last) {
    return parseInt(pageLinks.last.page, 10)
  } else {
    return 0;
  }
}

export function getIssues(org, repo, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
  return axios.get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = getPageCount(pageLinks);
      return {
        pageLinks,
        pageCount,
        data: res.data
      };
    })
    .catch(err => Promise.reject(err));
}

export function getRepoDetails(org, repo) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject(-1));
}

export function getIssue(org, repo, number) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues/${number}`;
  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}

export function getComments(url) {
  return axios.get(url)
    .then(res => res.data)
    .catch(err => Promise.reject(err));
}
