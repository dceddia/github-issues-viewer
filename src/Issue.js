import React, { PropTypes } from 'react';
import './Issue.css';

function shorten(text = "", length = 140) {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, "\\n");

  // Return if short enough already
  if(cleanText.length <= length) {
    return cleanText;
  }

  return cleanText.substr(0, 140);
}

export default function Issue({ number, title, labels, username, avatarUrl, summary }) {
  return (
    <div className="issue">
      <div className="issue__user">
        <img className="issue__user__avatar" src={avatarUrl} alt=""/>
        <div className="issue__user__name">{username}</div>
      </div>
      <div>
        <div>
          <span className="issue__number">#{number}</span>
          <span className="issue__title">{title}</span>
        </div>
        <p className="issue__summary">{shorten(summary)}</p>
        <div className="issue__labels">
          {labels.map(label =>
            <span className="issue__label" key={label}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired
};