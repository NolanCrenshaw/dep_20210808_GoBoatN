import React from 'react';
import { useHistory } from 'react-router-dom';

const ProfileButton = () => {
    const history = useHistory();

    function handleClick() {
        history.push("/profile")
        history.go(0)
    }

    return (
        <div
            className="main-header__button"
            id="main-header__button--profile"
            onClick={handleClick}>
            <span>Profile</span>
        </div>
    );
}
export default ProfileButton;
