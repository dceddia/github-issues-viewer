import * as API from '../api';

export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';
export const GET_REPO_DETAILS_BEGIN = 'GET_REPO_DETAILS_BEGIN';
export const GET_REPO_DETAILS_SUCCESS = 'GET_REPO_DETAILS_SUCCESS';
export const GET_REPO_DETAILS_FAILURE = 'GET_REPO_DETAILS_FAILURE';

export function getIssuesSuccess(issueResponse) {
  return {
    type: GET_ISSUES_SUCCESS,
    payload: {
      pageCount: issueResponse.pageCount,
      pageLinks: issueResponse.pageLinks,
      issues: issueResponse.data,
      loading: false
    }
  };
}

export function getIssuesFailure(error) {
  return {
    type: GET_ISSUES_FAILURE,
    error
  };
}

export function getIssues(org, repo, page) {
  return dispatch => {
    dispatch({type: GET_ISSUES_BEGIN});
    API.getIssues(org, repo, page)
      .then(res => dispatch(getIssuesSuccess(res)))
      .catch(error => dispatch(getIssuesFailure(error)));
  };
}

export function getRepoDetailsSuccess(details) {
  return {
    type: GET_REPO_DETAILS_SUCCESS,
    payload: details
  }
}

export function getRepoDetailsFailure(error) {
  return {
    type: GET_REPO_DETAILS_FAILURE,
    error
  }
}

export function getRepoDetails(org, repo) {
  return dispatch => {
    dispatch({type: GET_REPO_DETAILS_BEGIN });
    API.getRepoDetails(org, repo)
      .then(details => dispatch(getRepoDetailsSuccess(details)))
      .catch(error => dispatch(getRepoDetailsFailure(error)));
  } 
}