import axios from 'axios';
import parseLink from 'parse-link-header';

export function getIssues(org, repo, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
  return axios.get(url)
    .then(res => {
      const pageLinks = parseLink(res.headers.link);
      const pageCount = pageLinks.last ? parseInt(pageLinks.last.page, 10) : 0;
      return {
        pageLinks,
        pageCount,
        data: res.data
      };
    })
    .catch(err => {
      return Promise.reject({
        pageLinks: {},
        pageCount: 0,
        data: [],
        error: err
      });
    });
}

export function getOpenIssueCount(org, repo) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  return axios.get(url)
    .then(res => {
      return res.data.open_issues_count;
    })
    .catch(err => {
      return Promise.reject(-1);
    });
}