import React, { useState, useEffect } from 'react';
import { API_URL, IMG_KEY } from '../config';
import TripCard from './cards/TripCard';
import BannerEditSVG from '../images/BannerEditSVG';
import '../styles/landing.css';

// React Component
const Landing = props => {

    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`

    // State
    const [user, setUser] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [profilePic, setProfilePic] = useState(defaultPic);

    // Listen

    // Functions

    useEffect(() => {
        setUser(props.user);
        setUserInvites(props.invites);
        setUserTrips(props.trips);
        if (user.profile_pic !== null) {
            setProfilePic(`${IMG_KEY}${user.profile_pic}`)
        }
    })


// ---- Component Render ---- //

    // Render
    return (
        <div className="landing-root--container">
            <div className="landing">
                <div className="landing__picture-box">
                    <div className="landing__picture-box--edit-c">

                    </div>
                    <div className="landing__profile-pic--container">
                        <div className="landing__profile-pic">
                            <img src={profilePic}/>
                        </div>
                    </div>
                    <div className="landing__banner-edit--button">
                        <BannerEditSVG/>
                    </div>
                </div>
                <div className="vita">
                    <div className="vita-topbox">
                        <div className="vita-bio--container">
                            <div className="vita-bio__textbox">
                                <div className="vita-bio__name">
                                    <span>{ user.firstname } { user.lastname }</span>
                                </div>
                                <div className="vita-bio__username">
                                    <span>{ user.username }</span>
                                </div>
                                <div className="vita-bio__email">
                                    <span>{ user.email }</span>
                                </div>
                            </div>
                            <div className="vita-bio__infobox">

                            </div>
                            <div className="vita-bio__flairbox">

                            </div>
                        </div>
                    </div>
                    <div className="vita-bottombox">
                        <div className="vita-bottombox__cards-c">
                            <div className="vita-card vita-invite--container">
                                <div className="vita-card__header">
                                    <span>Invites:</span>
                                </div>
                            </div>
                            <div className="vita-card__divider"/>
                            <div className="vita-card vita-trips--container">
                                <div className="vita-card__header">
                                    <span>Trips:</span>
                                    <div className="vita-trip--container">
                                        { userTrips[0]
                                            ? userTrips[0].map(trip => <TripCard trip={trip}/>)
                                            : <div/>
                                        }
                                        { userTrips[1]
                                            ? userTrips[1].map(trip => <TripCard trip={trip}/>)
                                            : <div/>
                                        }
                                    </div>
                                        </div>
                            </div>
                            <div className="vita-card__divider"/>
                            <div className="vita-card vita-friends--container">
                                <div className="vita-card__header">
                                    <span>Friends:</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <div className="vita-tripbox">
                        <div className="vita-trip-c">
                            <span className="vita-trip--header">
                                Your Trips
                            </span>
                            <div className="vita-trip--container">
                                { userTrips[0]
                                    ? userTrips[0].map(trip => <TripCard trip={trip}/>)
                                    : <div/>
                                }
                                { userTrips[1]
                                    ? userTrips[1].map(trip => <TripCard trip={trip}/>)
                                    : <div/>
                                }
                            </div>
                        </div>
                        <div className="vita-trip-c">
                        <span className="vita-trip--header">
                                Your Invites
                            </span>
                            <div className="vita-trip--container">
                                { userInvites
                                    ? userInvites.map(trip => <TripCard trip={trip}/>)
                                    : <span>No Invites Right Now</span>
                                }
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
export default Landing;
