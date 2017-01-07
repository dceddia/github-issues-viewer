import { combineReducers } from 'redux';
import {
  GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE,
  GET_REPO_DETAILS_BEGIN, GET_REPO_DETAILS_SUCCESS, GET_REPO_DETAILS_FAILURE,
} from './actions';


const initialIssuesState = {
  issues: [],
  pageCount: 0,
  pageLinks: {},
  isLoading: false
};

const initialRepoState = {
  openIssuesCount: -1
};

export function issuesReducer(state = initialIssuesState, action) {
  switch(action.type) {
    case GET_ISSUES_BEGIN:
      return {
        ...state,
        isLoading: true
      };
    case GET_ISSUES_SUCCESS:
      return {
        ...state,
        pageCount: action.payload.pageCount,
        pageLinks: action.payload.pageLinks,
        issues: action.payload.issues,
        isLoading: false
      };
    case GET_ISSUES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function repoReducer(state = initialRepoState, action) {
  switch(action.type) {
    case GET_REPO_DETAILS_BEGIN:
      return state;
    case GET_REPO_DETAILS_SUCCESS:
      return {
        ...state,
        openIssuesCount: action.payload.open_issues_count
      };
    case GET_REPO_DETAILS_FAILURE:
      return {
        ...state,
        openIssuesCount: -1,
        error: action.error
      };
    default:
      return state;
  }
}

export default combineReducers({
  issues: issuesReducer,
  repo: repoReducer
});