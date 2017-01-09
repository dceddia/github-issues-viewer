import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import UserWithAvatar from './UserWithAvatar';
import IssueLabels from './IssueLabels';
import { shorten } from '../utils/stringUtils';
import './Issue.css';

export default function Issue({ number, title, labels, user, summary }, { router }) {
  const {org, repo} = router.params;
  return (
    <div className="issue">
      <UserWithAvatar user={user}/>
      <div className="issue__body">
        <Link to={`/${org}/${repo}/issues/${number}`}>
          <span className="issue__number">#{number}</span>
          <span className="issue__title">{title}</span>
        </Link>
        <p className="issue__summary">{shorten(summary)}</p>
        <IssueLabels labels={labels}/>
      </div>
    </div>
  );
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string
  })).isRequired,
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string
  }).isRequired,
  summary: PropTypes.string.isRequired
};

Issue.contextTypes = {
  router: PropTypes.object.isRequired
};