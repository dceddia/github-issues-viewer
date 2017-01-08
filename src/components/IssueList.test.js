import React from 'react';
import { shallow } from 'enzyme';
import { checkSnapshot } from '../utils/testUtils';
import IssueList from './IssueList';

let issues = [
{
    "url": "https://api.github.com/repos/rails/rails/issues/27599",
    "repository_url": "https://api.github.com/repos/rails/rails",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/27599/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/27599/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/27599/events",
    "html_url": "https://github.com/rails/rails/pull/27599",
    "id": 199328180,
    "number": 27599,
    "title": "Fix bug with symbolized keys in .where with nested join (alternative to #27598)",
    "user": {
      "login": "NickLaMuro",
      "id": 314014,
      "avatar_url": "https://avatars.githubusercontent.com/u/314014?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/NickLaMuro",
      "html_url": "https://github.com/NickLaMuro",
      "followers_url": "https://api.github.com/users/NickLaMuro/followers",
      "following_url": "https://api.github.com/users/NickLaMuro/following{/other_user}",
      "gists_url": "https://api.github.com/users/NickLaMuro/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/NickLaMuro/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/NickLaMuro/subscriptions",
      "organizations_url": "https://api.github.com/users/NickLaMuro/orgs",
      "repos_url": "https://api.github.com/users/NickLaMuro/repos",
      "events_url": "https://api.github.com/users/NickLaMuro/events{/privacy}",
      "received_events_url": "https://api.github.com/users/NickLaMuro/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "id": 107191,
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1",
        "default": false
      },
      {
        "id": 128692,
        "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
        "name": "needs feedback",
        "color": "ededed",
        "default": false
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": {
      "login": "sgrif",
      "id": 1529387,
      "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sgrif",
      "html_url": "https://github.com/sgrif",
      "followers_url": "https://api.github.com/users/sgrif/followers",
      "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
      "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
      "organizations_url": "https://api.github.com/users/sgrif/orgs",
      "repos_url": "https://api.github.com/users/sgrif/repos",
      "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sgrif/received_events",
      "type": "User",
      "site_admin": false
    },
    "assignees": [
      {
        "login": "sgrif",
        "id": 1529387,
        "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/sgrif",
        "html_url": "https://github.com/sgrif",
        "followers_url": "https://api.github.com/users/sgrif/followers",
        "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
        "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
        "organizations_url": "https://api.github.com/users/sgrif/orgs",
        "repos_url": "https://api.github.com/users/sgrif/repos",
        "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
        "received_events_url": "https://api.github.com/users/sgrif/received_events",
        "type": "User",
        "site_admin": false
      }
    ],
    "milestone": null,
    "comments": 2,
    "created_at": "2017-01-07T01:05:51Z",
    "updated_at": "2017-01-07T01:15:38Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/27599",
      "html_url": "https://github.com/rails/rails/pull/27599",
      "diff_url": "https://github.com/rails/rails/pull/27599.diff",
      "patch_url": "https://github.com/rails/rails/pull/27599.patch"
    },
    "body": "Summary\n-------\nIn https://github.com/rails/rails/pull/25146, code was added to fix making where clauses against tables with an `enum` column with a `join` present as part of the query.  As part of this fix, it called `singularize` on the `table_name` variable that was passed into the `associated_table` method.\n\n`table_name`, in some circumstances, can also be a symbol if more than one level of joins exists in the Relation (i.e `joins(:book => :subscription)`).  This fixes that by adding chaning the `.stringify_keys!` (found in `ActiveRecord::Relation::WhereClauseFactory`) to be a `.deep_stringify_keys!` to stringfy keys at all levels.\n\n\nOther Information\n-----------------\nThis bug only surfaces when a join is made more than 1 level deep since the `where_clause_builder` calls `stringify_keys!` on the top level of the `.where` hash:\n\nhttps://github.com/rails/rails/blob/21e5fd4/activerecord/lib/active_record/relation/where_clause_factory.rb#L16\n\nSo this hides this edge case from showing up in the test suite with the current coverage and the test that was in PR #25146.\n\nThis is the alternative to https://github.com/rails/rails/pull/27598 in which the change from PR #25146 was fixed in isolation.  Instead, here we fix the false assumption that all `table_name` values being passed into `.associated_table` are a string.  This might have wider effects because of that, so that should be considered when reviewing."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/27598",
    "repository_url": "https://api.github.com/repos/rails/rails",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/27598/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/27598/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/27598/events",
    "html_url": "https://github.com/rails/rails/pull/27598",
    "id": 199327680,
    "number": 27598,
    "title": "Fix bug with symbolized keys in .where with nested join",
    "user": {
      "login": "NickLaMuro",
      "id": 314014,
      "avatar_url": "https://avatars.githubusercontent.com/u/314014?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/NickLaMuro",
      "html_url": "https://github.com/NickLaMuro",
      "followers_url": "https://api.github.com/users/NickLaMuro/followers",
      "following_url": "https://api.github.com/users/NickLaMuro/following{/other_user}",
      "gists_url": "https://api.github.com/users/NickLaMuro/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/NickLaMuro/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/NickLaMuro/subscriptions",
      "organizations_url": "https://api.github.com/users/NickLaMuro/orgs",
      "repos_url": "https://api.github.com/users/NickLaMuro/repos",
      "events_url": "https://api.github.com/users/NickLaMuro/events{/privacy}",
      "received_events_url": "https://api.github.com/users/NickLaMuro/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "id": 107191,
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1",
        "default": false
      },
      {
        "id": 128692,
        "url": "https://api.github.com/repos/rails/rails/labels/needs%20feedback",
        "name": "needs feedback",
        "color": "ededed",
        "default": false
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": {
      "login": "sgrif",
      "id": 1529387,
      "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/sgrif",
      "html_url": "https://github.com/sgrif",
      "followers_url": "https://api.github.com/users/sgrif/followers",
      "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
      "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
      "organizations_url": "https://api.github.com/users/sgrif/orgs",
      "repos_url": "https://api.github.com/users/sgrif/repos",
      "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
      "received_events_url": "https://api.github.com/users/sgrif/received_events",
      "type": "User",
      "site_admin": false
    },
    "assignees": [
      {
        "login": "sgrif",
        "id": 1529387,
        "avatar_url": "https://avatars.githubusercontent.com/u/1529387?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/sgrif",
        "html_url": "https://github.com/sgrif",
        "followers_url": "https://api.github.com/users/sgrif/followers",
        "following_url": "https://api.github.com/users/sgrif/following{/other_user}",
        "gists_url": "https://api.github.com/users/sgrif/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/sgrif/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/sgrif/subscriptions",
        "organizations_url": "https://api.github.com/users/sgrif/orgs",
        "repos_url": "https://api.github.com/users/sgrif/repos",
        "events_url": "https://api.github.com/users/sgrif/events{/privacy}",
        "received_events_url": "https://api.github.com/users/sgrif/received_events",
        "type": "User",
        "site_admin": false
      }
    ],
    "milestone": null,
    "comments": 3,
    "created_at": "2017-01-07T01:00:48Z",
    "updated_at": "2017-01-07T01:15:33Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/27598",
      "html_url": "https://github.com/rails/rails/pull/27598",
      "diff_url": "https://github.com/rails/rails/pull/27598.diff",
      "patch_url": "https://github.com/rails/rails/pull/27598.patch"
    },
    "body": "Summary\n-------\nIn https://github.com/rails/rails/pull/25146, code was added to fix making where clauses against tables with an `enum` column with a `join` present as part of the query.  As part of this fix, it called `singularize` on the `table_name` variable that was passed into the `associated_table` method.\n\n`table_name`, in some circumstances, can also be a symbol if more than one level of joins exists in the Relation (i.e `joins(:book => :subscription)`).  This fixes that by adding `.to_s` before calling `.singularize` on the `table_name` variable.\n\n\nOther Information\n-----------------\nThis bug only surfaces when a join is made more than 1 level deep since the `where_clause_builder` calls `stringify_keys!` on the top level of the `.where` hash:\n\nhttps://github.com/rails/rails/blob/21e5fd4/activerecord/lib/active_record/relation/where_clause_factory.rb#L16\n\nSo this hides this edge case from showing up in the test suite with the current coverage and the test that was in PR #25146.\n\nThe other solution to this problem is to deeply stringify the keys in the `where_clause_builder` and all method calls following that can safely assume strings are being passed in as keys.  This is a heavier hammer, but the assumption is already being made on the top level to do this, so it seems like a better place to put it instead of scattered throughout the codebase and having it handle both strings/symbols in multiple places.  This alternative will be proposed in a separate PR.\n\n\nAlso of note, the this probably isn't the best place for a test like this, but it was the simplest way I could get a test in place without familiarizing myself with the entire ActiveRecord test suite (copying what was done in the previous PR).  Suggestions welcome for a better place for this test to live, but it is worth noting that this same test will also be used to confirm the same working functionality in the alternative form for this PR."
  },
  {
    "url": "https://api.github.com/repos/rails/rails/issues/27597",
    "repository_url": "https://api.github.com/repos/rails/rails",
    "labels_url": "https://api.github.com/repos/rails/rails/issues/27597/labels{/name}",
    "comments_url": "https://api.github.com/repos/rails/rails/issues/27597/comments",
    "events_url": "https://api.github.com/repos/rails/rails/issues/27597/events",
    "html_url": "https://github.com/rails/rails/pull/27597",
    "id": 199307639,
    "number": 27597,
    "title": "Consistency between first() and last() with limit",
    "user": {
      "login": "brchristian",
      "id": 2460418,
      "avatar_url": "https://avatars.githubusercontent.com/u/2460418?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/brchristian",
      "html_url": "https://github.com/brchristian",
      "followers_url": "https://api.github.com/users/brchristian/followers",
      "following_url": "https://api.github.com/users/brchristian/following{/other_user}",
      "gists_url": "https://api.github.com/users/brchristian/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/brchristian/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/brchristian/subscriptions",
      "organizations_url": "https://api.github.com/users/brchristian/orgs",
      "repos_url": "https://api.github.com/users/brchristian/repos",
      "events_url": "https://api.github.com/users/brchristian/events{/privacy}",
      "received_events_url": "https://api.github.com/users/brchristian/received_events",
      "type": "User",
      "site_admin": false
    },
    "labels": [
      {
        "id": 107191,
        "url": "https://api.github.com/repos/rails/rails/labels/activerecord",
        "name": "activerecord",
        "color": "0b02e1",
        "default": false
      }
    ],
    "state": "open",
    "locked": false,
    "assignee": {
      "login": "pixeltrix",
      "id": 6321,
      "avatar_url": "https://avatars.githubusercontent.com/u/6321?v=3",
      "gravatar_id": "",
      "url": "https://api.github.com/users/pixeltrix",
      "html_url": "https://github.com/pixeltrix",
      "followers_url": "https://api.github.com/users/pixeltrix/followers",
      "following_url": "https://api.github.com/users/pixeltrix/following{/other_user}",
      "gists_url": "https://api.github.com/users/pixeltrix/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/pixeltrix/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/pixeltrix/subscriptions",
      "organizations_url": "https://api.github.com/users/pixeltrix/orgs",
      "repos_url": "https://api.github.com/users/pixeltrix/repos",
      "events_url": "https://api.github.com/users/pixeltrix/events{/privacy}",
      "received_events_url": "https://api.github.com/users/pixeltrix/received_events",
      "type": "User",
      "site_admin": false
    },
    "assignees": [
      {
        "login": "pixeltrix",
        "id": 6321,
        "avatar_url": "https://avatars.githubusercontent.com/u/6321?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/pixeltrix",
        "html_url": "https://github.com/pixeltrix",
        "followers_url": "https://api.github.com/users/pixeltrix/followers",
        "following_url": "https://api.github.com/users/pixeltrix/following{/other_user}",
        "gists_url": "https://api.github.com/users/pixeltrix/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/pixeltrix/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/pixeltrix/subscriptions",
        "organizations_url": "https://api.github.com/users/pixeltrix/orgs",
        "repos_url": "https://api.github.com/users/pixeltrix/repos",
        "events_url": "https://api.github.com/users/pixeltrix/events{/privacy}",
        "received_events_url": "https://api.github.com/users/pixeltrix/received_events",
        "type": "User",
        "site_admin": false
      }
    ],
    "milestone": null,
    "comments": 1,
    "created_at": "2017-01-06T22:34:28Z",
    "updated_at": "2017-01-06T22:46:24Z",
    "closed_at": null,
    "pull_request": {
      "url": "https://api.github.com/repos/rails/rails/pulls/27597",
      "html_url": "https://github.com/rails/rails/pull/27597",
      "diff_url": "https://github.com/rails/rails/pull/27597.diff",
      "patch_url": "https://github.com/rails/rails/pull/27597.patch"
    },
    "body": "Fixes #23979.\r\n\r\nAs discussed in #23979, there was an inconsistency between the way that `first()` and `last()` would interact with `limit`. Specifically:\r\n\r\n```Ruby\r\n> Topic.limit(1).first(2).size\r\n=> 2\r\n> Topic.limit(1).last(2).size\r\n=> 1\r\n```\r\n\r\nThis PR is a refactor and rebase of #24124, with a simpler test suite and simpler implementation.\r\n\r\nDiscussion with Rails community members as well as DHH in https://github.com/rails/rails/pull/23598#issuecomment-189675440 showed that the behavior or `first` should be brought into line with `last` (rather than vice-versa).\r\n\r\nThis PR resolves the inconsistency between `first` and `last` when used in conjunction with `limit`.\r\n"
  }
];

// Jest doesn't handle \r\n in snapshots very well.
// https://github.com/facebook/jest/pull/1879#issuecomment-261019033
// Replace the body with some plain text
issues = issues.map(issue => ({
  ...issue,
  body: "something with no line breaks"
}));

it('renders', () => {
  const tree = shallow(
    <IssueList issues={issues}/>
  );

  checkSnapshot(tree);
});