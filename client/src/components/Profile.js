import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import '../styles/profile.css';


// React Component
const Profile = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const [profileUser, setProfileUser] = useState({});
    const [profileUserBoats, setProfileUserBoats] = useState([]);
    const [profileUserVehicles, setProfileUserVehicles] = useState([]);

    // Listen

    // Function
    useEffect(() => {
        const getUserProfile = async () => {
            const res = await fetch(`${BASE_URL}/api/users/${props.match.params.id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO Handling
                console.log("getUserProfile res failure");
            } else {
                const json = await res.json();
                setProfileUser(json.user);
                setProfileUserBoats(json.boats);
                setProfileUserVehicles(json.vehicles);
            }
        };
        getUserProfile();
    },[])


// ---- Component Render ---- //

    // Render
    return (
        <div className="profile-root--container">
            <div className="profile">
                <div className="profile-card">
                    <div className="profile-card__img--container">
                        <div className="profile-card__img"></div>
                    </div>
                    <div className="profile-card__bio--container">
                        <div className="profile-card__text-box">
                            <div
                                className="profile-card__field"
                                id="profile-card__username">
                                {/* { props.user.username } */}
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__email">
                                {/* { props.user.email } */}
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__firstname">
                                {/* { props.user.firstname } */}
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__lastname">
                                {/* { props.user.lastname } */}
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__skill">
                                {/* { props.user.skill } */}
                            </div>
                        </div>
                        <div className="profile-card__about--container">
                            <div
                                className="profile-card__field"
                                id="profile-card__about">
                                {/* { props.user.about } */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-bottom"></div>
            </div>
        </div>
    )

};
export default Profile;
