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

beforeEach(() => {
  API.getOpenIssueCount.mockImplementation(() => Promise.resolve(42));
});

it('renders while loading', () => {
  const tree = shallow(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={[]}
      isLoading={true}
      totalIssueCount={null}
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
      totalIssueCount={42}
      getIssues={jest.fn()}/>
  );
  checkSnapshot(tree);
});

it('calls getIssues', () => {
  let mockGetIssues = jest.fn();

  const tree = mount(
    <IssueListPage
      org="rails"
      repo="rails"
      issues={[]}
      isLoading={true}
      totalIssueCount={null}
      getIssues={mockGetIssues}/>
  );

  expect(mockGetIssues).toBeCalled();
});