import React, { PropTypes } from 'react';
import './UserWithAvatar.css';

const UserWithAvatar = ({ user, orientation = 'vertical', link = true }) => {
  const Wrapper = link ? 'a' : 'span';
  return (
    <Wrapper href={`https://github.com/${user.login}`} className={`issue__user ${orientation}`}>
      <img className="issue__user__avatar" src={user.avatar_url} alt=""/>
      <div className="issue__user__name">{user.login}</div>
    </Wrapper>
  );
};

UserWithAvatar.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string
  }).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};

export default UserWithAvatar;