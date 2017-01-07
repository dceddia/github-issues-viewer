jest.mock('../api');

import React from 'react';
import { mount } from 'enzyme';
import { checkSnapshot } from '../testUtils';
import * as API from '../api';
import { afterPromises } from '../testUtils';
import IssueListPage from './IssueListPage';
import page1 from '../fixtures/issues/page1.json';

// Jest doesn't handle \r\n in snapshots very well.
// https://github.com/facebook/jest/pull/1879#issuecomment-261019033
// Replace the body with some plain text
page1.data = page1.data.map(issue => ({
  ...issue,
  body: 'something without newlines'
}));

beforeEach(() => {
  API.getIssues.mockImplementation(() => Promise.resolve({
    data: page1.data,
    link: page1.link
  }));
  API.getOpenIssueCount.mockImplementation(() => Promise.resolve(42));
});

it('renders', (done) => {
  const tree = mount(
    <IssueListPage org="rails" repo="rails"/>
  );
  checkSnapshot(tree);
  afterPromises(done, () => checkSnapshot(tree));
});