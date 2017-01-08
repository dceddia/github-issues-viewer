import React from 'react';
import { shallow, mount } from 'enzyme';
import { IssueDetailPage } from './IssueDetailPage'
import { checkSnapshot } from '../utils/testUtils';
import page1 from '../fixtures/issues/page1';

const params = {issueId: "1"};
const issue = page1.data[0];

it('renders loading', () => {
  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      params={params} />
  );
  checkSnapshot(tree);
});

it('renders an error when issue does not load', () => {
  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      issueError={new Error('something went wrong')}
      params={params} />
  );
  checkSnapshot(tree);
});

it('renders an issue that has no comments', () => {
  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      params={params}
      issue={{...issue, comments: 0}} />
  );
  checkSnapshot(tree);
});

it('renders an issue that has comments that are being loaded', () => {
  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      params={params}
      issue={issue} />
  );
  checkSnapshot(tree);
});

it('renders an issue with its loaded comments', () => {
  let issueWithComments = {...issue, comments: 2};
  let comments = [{id: 1}, {id: 2}];

  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      params={params}
      issue={issueWithComments}
      comments={comments} />
  );
  checkSnapshot(tree);
});

it('renders an issue with a comment-loading error', () => {
  const error = new Error('something went wrong');
  const tree = shallow(
    <IssueDetailPage
      getIssue={jest.fn()}
      getComments={jest.fn()}
      params={params}
      issue={issue}
      commentsError={error} />
  );
  checkSnapshot(tree);
});

describe('fetching data', () => {
  let getIssue, getComments;

  beforeEach(() => {
    getIssue = jest.fn();
    getComments = jest.fn();
  });

  it('fetches the issue, but not comments yet', () => {
    const tree = mount(
      <IssueDetailPage
        issue={undefined}
        getIssue={getIssue}
        getComments={getComments}
        params={params} />
    );
    expect(getIssue).toBeCalled();
    expect(getComments).not.toBeCalled();
  });

  it('fetches comments if issue is passed in', () => {
    const tree = mount(
      <IssueDetailPage
        issue={issue}
        getIssue={getIssue}
        getComments={getComments}
        params={params} />
    );
    expect(getIssue).not.toBeCalled();
    expect(getComments).toBeCalled();
  });

  it('fetches comments after the issue loads', () => {
    const tree = mount(
      <IssueDetailPage
        issue={undefined}
        getIssue={getIssue}
        getComments={getComments}
        params={params} />
    );

    expect(getIssue).toBeCalled();
    expect(getComments).not.toBeCalled();

    tree.setProps({ issue });
    expect(getComments).toBeCalled();
  });
});