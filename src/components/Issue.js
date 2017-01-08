import React, { PropTypes } from 'react';
import UserWithAvatar from './UserWithAvatar';
import IssueLabels from './IssueLabels';
import './Issue.css';

export function shorten(text = "", maxLength = 140) {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, "\n");

  // Return if short enough already
  if(cleanText.length <= maxLength) {
    return cleanText;
  }

  // Return the 140 chars as-is if they end in a non-word char
  const oneTooLarge = cleanText.substr(0, 141);
  if(/\W$/.test(oneTooLarge)) {
    return oneTooLarge.substr(0, 140) + "...";
  }

  // Walk backwards to the nearest non-word character
  let i = oneTooLarge.length;
  while(--i) {
    if(/\W/.test(oneTooLarge[i])) {
      return oneTooLarge.substr(0, i) + "...";
    }
  }

  return oneTooLarge.substr(0, 140) + "...";
}

export default function Issue({ number, title, labels, user, summary }) {
  return (
    <div className="issue">
      <UserWithAvatar user={user}/>
      <div>
        <div>
          <span className="issue__number">#{number}</span>
          <span className="issue__title">{title}</span>
        </div>
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