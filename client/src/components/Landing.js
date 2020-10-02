import React, { useState, useEffect } from 'react';
import { BASE_URL, IMG_KEY } from '../config';
import TripCard from './cards/TripCard';
import UserCard from './cards/UserCard';
import FriendCard from './cards/FriendCard';
import BannerEditSVG from '../images/BannerEditSVG';
import '../styles/landing.css';

// React Component
const Landing = props => {

    const imgFile = React.createRef();
    const token = window.localStorage.getItem("auth_token");
    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`;

    // State
    const [user, setUser] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [profilePic, setProfilePic] = useState(defaultPic);

    // Modal State
    const [profileModal, setProfileModal] = useState("profile-modal--hidden");
    const [bannerModal, setBannerModal] = useState("banner-modal--hidden");

    // Listen

    // Profile Modal Toggle Function
    const profileToggle = () => {
        if (profileModal === "profile-modal--hidden") {
            setProfileModal("profile-modal--visible");
        } else {
            setProfileModal("profile-modal--hidden");
        }
    }

    // Banner Modal Toggle Function
    const bannerToggle = () => {
        if (bannerModal === "banner-modal--hidden") {
            setBannerModal("banner-modal--visible");
        } else {
            setBannerModal("profile-modal--hidden");
        }
    }

    // Profile Upload Function
    const uploadProfileImg = async () => {
        if (imgFile.current.files[0] !== undefined) {
            const formData = new FormData();
            formData.append('file', imgFile.current.files[0])

            const res = await fetch(`${BASE_URL}/api/bucket/upload`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("uploadImg res failure")
            } else {
                const json = await res.json()
                setUser(props.user.profile_pic = json.sprite)
            }
            const newres = await fetch(`${BASE_URL}/api/users/token/update`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(props.user.profile_pic)
            })
            if (!newres.ok) {
                // -- TODO -- Handling
                console.log("NewRes User update failed");
            } else {
                // -- TODO -- Handling
                const newjson = await newres.json()
                console.log(newjson.message)
            }
        };
    };

    useEffect(() => {
        setUser(props.user);
        setUserInvites(props.invites);
        setUserTrips(props.trips);
        setUserFriends(props.friends);
        if (user.profile_pic !== null) {
            setProfilePic(`${IMG_KEY}${user.profile_pic}`)
        }
    })


// ---- Component Render ---- //

    // Render
    return (
        <div className="landing-root--container">
            <div className="landing">
                <div className="landing__picture-modals">
                    <div className={profileModal}>
                        <div className="landing-modal">
                            <div className="landing-modal--background">
                                <div className="landing-modal__upload-img">
                                    <span>Upload a Profile picture</span>
                                    <input
                                        className=""
                                        type="file"
                                        accept="image/*"
                                        name="file"
                                        ref={imgFile} />
                                    <div
                                        className="landing-modal__upload--button"
                                        onClick={uploadProfileImg}>
                                        <span>Submit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={bannerModal}>
                    <div className="landing-modal">
                        <div className="landing-modal--background">
                            <div className="profile-card__upload-img">
                                <span>Upload a Banner picture</span>
                                <input
                                    className=""
                                    type="file"
                                    accept="image/*"
                                    name="file"
                                    ref={imgFile} />
                                <div
                                    className="profile-card__upload--button"
                                    onClick={uploadProfileImg}>
                                    <span>Submit</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing__picture-box">
                    <div className="landing__profile-pic--container">
                        <div className="landing__profile-pic">
                            <img src={profilePic}/>
                            <div
                                className="landing__profile-edit--button"
                                >
                                <BannerEditSVG/>
                            </div>
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
                                    { userFriends.map(
                                        friend_id => <FriendCard user_id={friend_id}/>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Landing;
