import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
    const history = useHistory();

    function handleClick() {
        history.push("/");
        window.localStorage.removeItem('auth_token');
        window.location.reload();
    }

    return (
        <div
            className="main-header__button"
            id="main-header__button--logout"
            onClick={handleClick}>
            <span>Log out</span>
        </div>
    );
}
export default LogoutButton;
