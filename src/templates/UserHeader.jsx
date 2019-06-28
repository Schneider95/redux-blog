import React from 'react';

const UserHeaderJsx = (props) => {
  const { user } = props;

  return (
    <div className="header">{user.name}</div>
  );
};

export default UserHeaderJsx;
