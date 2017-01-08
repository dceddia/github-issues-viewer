import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import UserWithAvatar from './UserWithAvatar';
import { insertMentionLinks } from '../utils/stringUtils';

export default function IssueComment({ comment }) {
  return (
    <div className="issue-detail__comment">
      <a href={`https://github.com/${comment.user.login}`}>
        <UserWithAvatar user={comment.user} orientation="horizontal"/>
      </a>

      <div className="issue-detail__comment__body">
        <ReactMarkdown className="markdown" source={insertMentionLinks(comment.body)}/>
      </div>
    </div>
  );
}

IssueComment.propTypes = {
  comment: PropTypes.shape({
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string
    }).isRequired,
    body: PropTypes.string
  }).isRequired
};