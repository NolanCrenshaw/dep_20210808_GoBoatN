import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/usercard.css';


// React Component
const UserCard = props => {

    // State
    const history = useHistory();

    // Listen

    // Function
    const navToUser = () => {
        history.push(`/users/${props.user[0].id}`);
        history.go(0);
    };

// ---- Component Render ---- //

    // Render
    return (
        <div className="userCard-root--container">
            <div
                className="userCard"
                onClick={navToUser}>
                <div className="userCard__sidebox"></div>
                <div className="userCard__text-container">
                    <div className="userCard__name">
                        <span>{props.user[0].name}</span>
                    </div>
                    <div className="userCard__info-container">
                        <div className="userCard__info--class">
                            <span>{props.user[0].class_designation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default UserCard;
