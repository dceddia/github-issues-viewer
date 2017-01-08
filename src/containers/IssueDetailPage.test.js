import { insertMentionLinks } from './IssueDetailPage';

describe('insertMentionLinks', () => {
  it('replaces mention at beginning of line', () => {
    expect(insertMentionLinks("@foo bar baz"))
      .toEqual("**[@foo](https://github.com/foo)** bar baz");
  });

  it('replaces all mentions', () => {
    expect(insertMentionLinks("@foo @bar @baz"))
      .toEqual("**[@foo](https://github.com/foo)** **[@bar](https://github.com/bar)** **[@baz](https://github.com/baz)**");
  });

  it('does not replace emails', () => {
    expect(insertMentionLinks("the@person.com"))
      .toEqual("the@person.com");
  });

  it('only includes word characters', () => {
    expect(insertMentionLinks("@the_person"))
      .toEqual("**[@the_person](https://github.com/the_person)**");

    expect(insertMentionLinks("@the_person."))
      .toEqual("**[@the_person](https://github.com/the_person)**.");
  });

  it('allows dashes', () => {
    expect(insertMentionLinks("@the-person"))
      .toEqual("**[@the-person](https://github.com/the-person)**");
  });

  it('only allows single dashes', () => {
    expect(insertMentionLinks("@the--person"))
      .toEqual("**[@the](https://github.com/the)**--person");
  });

  it('cannot start with dash or underscore', () => {
    expect(insertMentionLinks("@-foo")).toEqual("@-foo");
    expect(insertMentionLinks("@_foo")).toEqual("@_foo");
  });
});