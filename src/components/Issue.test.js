import React from 'react';
import { shallow } from 'enzyme';
import { checkSnapshot } from '../testUtils';
import Issue, { shorten } from './Issue';

it('renders', () => {
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
      />
  );

  checkSnapshot(tree);
});

describe('shorten', () => {
  it('leaves text alone if short enough', () => {
    const justFine = 'a'.repeat(139);
    expect(shorten(justFine)).toEqual(justFine);
  });

  it('shortens when there are no breaks', () => {
    const tooLong = 'a'.repeat(141);
    const expected = 'a'.repeat(140) + "...";
    expect(shorten(tooLong)).toEqual(expected);
  });

  it('shortens to 140 when 141 is a non-word', () => {
    const tooLong = 'a'.repeat(140) + " ";
    const expected = 'a'.repeat(140) + "...";
    expect(shorten(tooLong)).toEqual(expected);
  });

  describe('shortening more than necessary', () => {
    const testWithChar = (char) => {
      const tooLong = 'a'.repeat(135) + char + 'b'.repeat(50);
      const expected = 'a'.repeat(135 )+ "...";
      expect(shorten(tooLong)).toEqual(expected);
    };

    it('shortens to the nearest whitespace', () => {
      testWithChar(' ');
      testWithChar('\n');
      testWithChar('\t');
    });

    it('shortens to the nearest punctuation', () => {
      testWithChar('.');
      testWithChar(';');
      testWithChar('!');
    });
  })
});