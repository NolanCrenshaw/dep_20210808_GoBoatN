import React from 'react';
import '../styles/profile.css';
import '../styles/profileedit.css';



// React Component
const ProfileEdit = props => {

    // State

    // Listen

    // Function


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
                                { props.user.username }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__email">
                                { props.user.email }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__firstname">
                                { props.user.firstname }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__lastname">
                                { props.user.lastname }
                            </div>
                            <div
                                className="profile-card__field"
                                id="profile-card__skill">
                                { props.user.skill }
                            </div>
                        </div>
                        <div className="profile-card__about--container">
                            <div
                                className="profile-card__field"
                                id="profile-card__about">
                                { props.user.about }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-bottom"></div>
            </div>
        </div>
    )

};
export default ProfileEdit;
