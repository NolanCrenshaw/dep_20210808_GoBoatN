import React from 'react';
import { useHistory } from 'react-router-dom';

const HomeButton = () => {
    const history = useHistory();

    function handleClick() {
        history.push("/")
        history.go(0)
    }

    return (
        <div
            className="main-header__button"
            id="main-header__button--home"
            onClick={handleClick}>
            <span>Home</span>
        </div>
    );
}
export default HomeButton;
