import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_KEY } from '../../config';
import '../../styles/usercard.css';


// React Component
const UserCard = props => {

    const history = useHistory();
    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`;

    // State
    const [user, setUser] = useState({});
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(defaultPic);

    // Listen

    // Function
    const navToUser = () => {
        history.push(`/users/${props.user.id}`);
        history.go(0);
    };

    useEffect(() => {
        setUser(props.user)
        setFirstname(props.user.firstname)
        setLastname(props.user.lastname)
        setUsername(props.user.username)
        setProfilePic(`${IMG_KEY}${props.user.profile_pic}`)
        console.log("CYCLING!")
    },[props.user])

// ---- Component Render ---- //

    // Render
    return (
        <div className="userCard-root--container">
            <div
                className="userCard"
                onClick={navToUser}>
                <div className="userCard__sidebox">
                    <div className="userCard__profile_pic">
                        <img src={profilePic} />
                    </div>
                </div>
                <div className="userCard__text-container">
                    <div className="userCard__name">
                        <span>{firstname} {lastname}</span>
                    </div>
                    <div className="userCard__info-container">
                        <span>{username}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default UserCard;
