import { issuesReducer, repoReducer, commentsReducer } from './reducers';
import {
  GET_ISSUE_BEGIN, GET_ISSUE_SUCCESS, GET_ISSUE_FAILURE,
  GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE,
  GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILURE,
  GET_REPO_DETAILS_BEGIN, GET_REPO_DETAILS_SUCCESS, GET_REPO_DETAILS_FAILURE,
} from './actions';

describe('issuesReducer', () => {
  describe('getting multiple issues', () => {
    it('has initial state', () => {
      expect(issuesReducer(undefined, {})).toEqual({
        issuesByNumber: {},
        currentPageIssues: [],
        pageCount: 0,
        pageLinks: {},
        isLoading: false,
        error: null
      });
    });

    it('handles BEGIN', () => {
      expect(issuesReducer({}, {type: GET_ISSUES_BEGIN })).toEqual({
        isLoading: true
      });
    });

    it('handles FAILURE', () => {
      expect(issuesReducer({}, {type: GET_ISSUES_FAILURE, error: 'foo'})).toEqual({
        isLoading: false,
        error: 'foo'
      });
    });

    it('handles SUCCESS with issues', () => {
      const payload = {
        pageCount: 42,
        pageLinks: {next: {}},
        issues: [{
          number: 1
        }, {
          number: 2
        }]
      };

      expect(issuesReducer({}, {type: GET_ISSUES_SUCCESS, payload })).toEqual({
        issuesByNumber: {
          1: {number: 1},
          2: {number: 2},
        },
        currentPageIssues: [1, 2],
        pageCount: 42,
        pageLinks: payload.pageLinks,
        isLoading: false,
        error: null
      });
    });

    it('handles SUCCESS with empty issues', () => {
      const payload = {
        pageCount: 42,
        pageLinks: {next: {}},
        issues: []
      };

      expect(issuesReducer({}, {type: GET_ISSUES_SUCCESS, payload})).toEqual({
        issuesByNumber: {},
        currentPageIssues: [],
        pageCount: 42,
        pageLinks: payload.pageLinks,
        isLoading: false,
        error: null
      });
    });
  });

  describe('getting a single issue', () => {
    it('handles BEGIN', () => {
      expect(issuesReducer({}, {type: GET_ISSUE_BEGIN})).toEqual({
        isLoading: true
      });
    });

    it('handles SUCCESS when no issues are present', () => {
      const payload = { number: 1 };
      expect(issuesReducer({}, {type: GET_ISSUE_SUCCESS, payload})).toEqual({
        issuesByNumber: {
          1: {number: 1}
        },
        isLoading: false,
        error: null
      });
    });

    it('handles SUCCESS when other issues already exist', () => {
      const payload = { number: 3 };
      expect(issuesReducer({
        issuesByNumber: {
          1: {number: 1},
          2: {number: 2}
        }
      }, {type: GET_ISSUE_SUCCESS, payload})).toEqual({
        issuesByNumber: {
          1: {number: 1},
          2: {number: 2},
          3: {number: 3}
        },
        isLoading: false,
        error: null
      });
    });

    it('updates existing issue', () => {
      const payload = { number: 1, updated: true };
      expect(issuesReducer({
        issuesByNumber: {
          1: {number: 1},
          2: {number: 2}
        }
      }, {type: GET_ISSUE_SUCCESS, payload})).toEqual({
        issuesByNumber: {
          1: {number: 1, updated: true},
          2: {number: 2},
        },
        isLoading: false,
        error: null
      });
    });

    it('handles FAILURE', () => {
      expect(issuesReducer({}, {type: GET_ISSUE_FAILURE, error: 'foo'})).toEqual({
        isLoading: false,
        error: 'foo'
      });
    });
  });
});

describe('repoReducer', () => {
  it('has initial state', () => {
    expect(repoReducer(undefined, {})).toEqual({
      openIssuesCount: -1,
      error: null
    });
  });

  it('handles BEGIN', () => {
    const state = { openIssuesCount: 10 };
    expect(repoReducer(state, {type: GET_REPO_DETAILS_BEGIN})).toEqual(state);
  });

  it('handles SUCCESS', () => {
    const state = { openIssuesCount: 10 };
    const payload = { open_issues_count: 42 };
    expect(repoReducer(state, {type: GET_REPO_DETAILS_SUCCESS, payload})).toEqual({
      openIssuesCount: 42,
      error: null
    });
  });

  it('handles FAILURE', () => {
    const state = { openIssuesCount: 10 };
    const error = new Error('something bad');
    expect(repoReducer(state, {type: GET_REPO_DETAILS_FAILURE, error})).toEqual({
      openIssuesCount: -1,
      error
    });
  });
});

describe('commentsReducer', () => {
  it('has initial state', () => {
    expect(commentsReducer(undefined, {})).toEqual({
      error: null
    });
  });

  it('handles BEGIN', () => {
    expect(commentsReducer({}, {type: GET_COMMENTS_BEGIN})).toEqual({});
  });

  it('handles SUCCESS when no comments exist', () => {
    const state = {};
    const payload = {
      comments: [1, 2, 3],
      issueNumber: 1
    };
    expect(commentsReducer(state, {type: GET_COMMENTS_SUCCESS, payload})).toEqual({
      1: [1, 2, 3],
      error: null
    });
  });

  it('merges in comments for new issues', () => {
    const state = {
      1: [1, 2]
    };
    const payload = {
      comments: [3, 4],
      issueNumber: 2
    };
    expect(commentsReducer(state, {type: GET_COMMENTS_SUCCESS, payload})).toEqual({
      1: [1, 2],
      2: [3, 4],
      error: null
    });
  });

  it('replaces existing comments', () => {
    const state = {
      1: [1, 2]
    };
    const payload = {
      comments: [3, 4],
      issueNumber: 1
    };
    expect(commentsReducer(state, {type: GET_COMMENTS_SUCCESS, payload})).toEqual({
      1: [3, 4],
      error: null
    });
  });

  it('handles FAILURE', () => {
    const state = {
      1: [1, 2]
    };
    const error = new Error('something bad');
    expect(commentsReducer(state, {type: GET_COMMENTS_FAILURE, error})).toEqual({
      1: [1, 2],
      error
    });
  });
});