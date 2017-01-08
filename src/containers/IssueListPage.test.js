jest.mock('../api');

import React from 'react';
import { shallow, mount } from 'enzyme';
import { checkSnapshot } from '../testUtils';
import * as API from '../api';
import { afterPromises } from '../testUtils';
import { IssueListPage } from './IssueListPage';
import page1 from '../fixtures/issues/page1.json';

// Jest doesn't handle \r\n in snapshots very well.
// https://github.com/facebook/jest/pull/1879#issuecomment-261019033
// Replace the body with some plain text
page1.data = page1.data.map(issue => ({
  ...issue,
  body: 'something without newlines'
}));

const location = {
  query: {}
};

const context = {
  router: {}
};

it('renders while loading', () => {
  const tree = shallow(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={[]}
      isLoading={true}
      pageCount={10}
      openIssuesCount={-1}
      getIssues={jest.fn()}
      location={location}/>,
      { context }
  );
  checkSnapshot(tree);
});

it('renders with issues', () => {
  const tree = shallow(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={page1.data}
      isLoading={false}
      pageCount={10}
      openIssuesCount={42}
      getIssues={jest.fn()}
      location={location}/>,
      { context }
  );
  checkSnapshot(tree);
});

it('calls getIssues and getRepoDetails', () => {
  let mockGetIssues = jest.fn();
  let mockGetRepoDetails = jest.fn();

  const tree = mount(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={[]}
      isLoading={true}
      openIssuesCount={-1}
      pageCount={1}
      location={location}
      getIssues={mockGetIssues}
      getRepoDetails={mockGetRepoDetails}/>,
      { context }
  );

  expect(mockGetIssues).toBeCalled();
  expect(mockGetRepoDetails).toBeCalled();
});