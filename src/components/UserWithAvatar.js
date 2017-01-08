import React, { PropTypes } from 'react';
import './UserWithAvatar.css';

const UserWithAvatar = ({ user, orientation = 'vertical' }) => (
  <a href={`https://github.com/${user.login}`} className={`issue__user ${orientation}`}>
    <img className="issue__user__avatar" src={user.avatar_url} alt=""/>
    <div className="issue__user__name">{user.login}</div>
  </a>
);

UserWithAvatar.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string
  }).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};

export default UserWithAvatar;