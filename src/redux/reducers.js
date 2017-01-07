import { combineReducers } from 'redux';
import { GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE } from './actions';

const initialIssuesState = {
  issues: [],
  issueCount: null,
  pageCount: 0,
  pageLinks: {},
  isLoading: false
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

export default combineReducers({
  issues: issuesReducer
});