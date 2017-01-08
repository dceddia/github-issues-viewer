import { shorten, insertMentionLinks } from './stringUtils';

describe('shorten', () => {
  const ellip = " ...";
  it('leaves text alone if short enough', () => {
    const justFine = 'a'.repeat(139);
    expect(shorten(justFine)).toEqual(justFine);
  });

  it('shortens when there are no breaks', () => {
    const tooLong = 'a'.repeat(141);
    const expected = 'a'.repeat(140) + ellip;
    expect(shorten(tooLong)).toEqual(expected);
  });

  it('shortens to 140 when 141 is a non-word', () => {
    const tooLong = 'a'.repeat(140) + " ";
    const expected = 'a'.repeat(140) + ellip;
    expect(shorten(tooLong)).toEqual(expected);
  });

  describe('shortening more than necessary', () => {
    const testWithChar = (char) => {
      const tooLong = 'a'.repeat(135) + char + 'b'.repeat(50);
      const expected = 'a'.repeat(135) + ellip;
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