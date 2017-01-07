import axios from 'axios';
import parseLink from 'parse-link-header';

export function getIssues(org, repo, page = 1) {
  const url = `https://api.github.com/repos/${org}/${repo}/issues?per_page=25&page=${page}`;
  return axios.get(url)
    .then(res => {
      return {
        pages: parseLink(res.headers.link),
        data: res.data
      };
    })
    .catch(err => {
      return {
        pages: {},
        data: [],
        error: err
      };
    });
}

export function getOpenIssueCount(org, repo) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  return axios.get(url)
    .then(res => {
      return res.data.open_issues_count;
    })
    .catch(err => {
      return -1;
    });
}