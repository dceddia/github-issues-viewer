import React, { PropTypes } from 'react';
import './UserWithAvatar.css';

const UserWithAvatar = ({ user, orientation = 'vertical' }) => (
  <span className={`issue__user ${orientation}`}>
    <img className="issue__user__avatar" src={user.avatar_url} alt=""/>
    <div className="issue__user__name">{user.login}</div>
  </span>
);

UserWithAvatar.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string
  }).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};

export default UserWithAvatar;