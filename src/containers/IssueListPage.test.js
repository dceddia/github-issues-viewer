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

it('renders while loading', () => {
  const tree = shallow(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={[]}
      isLoading={true}
      openIssuesCount={-1}
      getIssues={jest.fn()}/>
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
      openIssuesCount={42}
      getIssues={jest.fn()}/>
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
      getIssues={mockGetIssues}
      getRepoDetails={mockGetRepoDetails}/>
  );

  expect(mockGetIssues).toBeCalled();
  expect(mockGetRepoDetails).toBeCalled();
});