import React from 'react';
import IssueComment from './IssueComment';

export default function IssueComments({ comments = [] }) {
  return (
    <ul className="issue-detail__comments">
      {comments.map(comment =>
        <li key={comment.id}>
          <IssueComment comment={comment}/>
        </li>
      )}
    </ul>
  );
}


