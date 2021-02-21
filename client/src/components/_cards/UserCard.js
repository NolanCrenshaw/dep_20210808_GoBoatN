import React, { useEffect, useState } from "react";

// React Component
const UserCard = ({ user }) => {
  const navToUser = () => {
    /*
    ~~ TODO ~~
    Bad coding. fix nav click
    */
    // history.push(`/users/${user.id}`);
    // history.go(0);
    console.log(`${user.username}'s user card hit!`);
  };

  return (
    <div className="userCard-root--container">
      <div className="userCard" onClick={navToUser}>
        <div className="userCard__sidebox">
          <div className="userCard__profile_pic"></div>
        </div>
        <div className="userCard__text-container">
          <div className="userCard__name">
            <span>
              {user.firstname} {user.lastname}
            </span>
          </div>
          <div className="userCard__info-container">
            <span>{user.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
