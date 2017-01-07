import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Issue from './Issue';
import './IssueList.css';

function avatarForUser(user) {
  return user.avatar_url || user.gravatar_id;
}

export default function IssueList({ issues }) {
  return (
    <ul className="issues">
      {issues.map(issue =>
        <li key={issue.id} className="issues__issue-wrapper">
          <Link to={`/issue/${issue.number}`} className="issues__issue-link">
            <Issue
              number={issue.number}
              username={issue.user.login}
              avatarUrl={avatarForUser(issue.user)}
              title={issue.title}
              summary={issue.body}
              labels={issue.labels} />
          </Link>
        </li>
      )}
    </ul>
  );
}

IssueList.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.number.isRequired,
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
      gravatar_id: PropTypes.string
    }).isRequired,
    title: PropTypes.string,
    body: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      color: PropTypes.string
    }))
  }))
};