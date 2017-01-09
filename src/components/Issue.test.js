import React from 'react';
import { shallow } from 'enzyme';
import { checkSnapshot } from '../utils/testUtils';
import Issue, { shorten } from './Issue';

it('renders', () => {
  const context = { router: {params: {org: 'rails', repo: 'rails'}} };
  const tree = shallow(
    <Issue
        number={27593}
        title="Yield in partial view does not call block given by calling view"
        user={{
          login: "somebody",
          avatar_url: "https://avatars.githubusercontent.com/u/2460418?v=3"
        }}
        labels={[{
          id: 1, name: "activerecord", color: "123456"
        }]}
        summary="Fixes #23979.\r\n\r\nAs discussed in #23979, there was an inconsistency between the way that `first()` and `last()` would interact with `limit`. Specifically:\r\n\r\n```Ruby\r\n> Topic.limit(1).first(2).size\r\n=> 2\r\n> Topic.limit(1).last(2).size\r\n=> 1\r\n```\r\n\r\nThis PR is a refactor and rebase of #24124, with a simpler test suite and simpler implementation.\r\n\r\nDiscussion with Rails community members as well as DHH in https://github.com/rails/rails/pull/23598#issuecomment-189675440 showed that the behavior or `first` should be brought into line with `last` (rather than vice-versa).\r\n\r\nThis PR resolves the inconsistency between `first` and `last` when used in conjunction with `limit`.\r\n"
      />, { context }
  );

  checkSnapshot(tree);
});