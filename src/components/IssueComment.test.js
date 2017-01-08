import React from 'react';
import { shallow } from 'enzyme';
import { checkSnapshot } from '../utils/testUtils';
import IssueComment from './IssueComment';

it('renders a comment', () => {
  const comment = {
    user: {
      login: "somebody",
      avatar_url: "http://foo"
    },
    body: "a comment"
  };
  const tree = shallow(
    <IssueComment comment={comment}/>
  );
  checkSnapshot(tree);
});