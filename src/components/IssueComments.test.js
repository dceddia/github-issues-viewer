import React from 'react';
import { shallow } from 'enzyme';
import { checkSnapshot } from '../utils/testUtils';
import IssueComments from './IssueComments';

it('renders with no comments', () => {
  const tree = shallow(<IssueComments/>);
  checkSnapshot(tree);
});

it('renders comments', () => {
  const comment = {
    user: {
      login: "somebody",
      avatar_url: "http://foo"
    },
    body: "a comment"
  };
  const comments = [{...comment, id: 1}, {...comment, id: 2}];
  const tree = shallow(
    <IssueComments comments={comments}/>
    );
  checkSnapshot(tree);
});