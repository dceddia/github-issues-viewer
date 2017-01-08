import React, { PropTypes } from 'react';
import Issue from './Issue';
import './IssueList.css';

export default function IssueList({ issues }) {
  return (
    <ul className="issues">
      {issues.map(issue =>
        <li key={issue.id} className="issues__issue-wrapper">
            <Issue
              number={issue.number}
              user={issue.user}
              title={issue.title}
              summary={issue.body}
              labels={issue.labels} />
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