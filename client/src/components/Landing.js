import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { BASE_URL, IMG_KEY } from '../config';
import TripCard from './cards/TripCard';
import UserCard from './cards/UserCard';
import FriendCard from './cards/FriendCard';
import BannerEditSVG from '../images/BannerEditSVG';
import '../styles/landing.css';

// React Component
const Landing = props => {

    const imgFile = React.createRef();
    const imgFile2 = React.createRef();
    const token = window.localStorage.getItem("auth_token");
    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`;

    // State
    const [user, setUser] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [profilePic, setProfilePic] = useState(defaultPic);

    // Modal State
    const [modalIsOpen, setIsOpen] = useState(false);
    const [profileModal, setProfileModal] = useState("profile-edit__container--hidden");
    const [bannerModal, setBannerModal] = useState("banner-edit__container--hidden");
    const customStyles = {
        content : {
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'border-radius': '20px',
            'scrollbar-width': 'none',
        },
        overlay: {zIndex: 3},
    };

    // Listen

    // REACT-MODAL
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setProfileModal("profile-edit__container--hidden");
        setBannerModal("banner-edit__container--hidden");
        setIsOpen(false);
    }
    const profileEditOpen = () => {
        openModal();
        setProfileModal("profile-edit__container--visible");
    }
    const bannerEditOpen = () => {
        openModal();
        setBannerModal("banner-edit__container--visible");
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
        closeModal();
    };
    const uploadBannerImg = async () => {
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
                setUser(props.user.banner_pic = json.sprite)
            }
            const newres = await fetch(`${BASE_URL}/api/users/token/update`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(props.user.banner_pic)
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
        closeModal();
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
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example">
                <div className="landing-modal--background">
                    <div className={bannerModal}>
                        <label
                            for="banner-upload"
                            className="custom-file-upload">
                            Upload a Banner picture
                        </label>
                        <input
                            id="banner-upload"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            name="file"
                            ref={imgFile} />
                        <div
                            className="landing-modal__upload--button"
                            onClick={uploadBannerImg}>
                            <span>Submit</span>
                        </div>
                    </div>
                    <div className={profileModal}>
                        <label
                            for="profile-upload"
                            className="custom-file-upload">
                            Upload a Profile picture
                        </label>
                        <input
                            id="profile-upload"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            name="file"
                            ref={imgFile2} />
                        <div
                            className="landing-modal__upload--button"
                            onClick={uploadProfileImg}>
                            <span>Submit</span>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <div className="landing">
                <div className="landing__picture-box">
                    <div className="landing__profile-pic--container">
                        <div className="landing__profile-pic">
                            <img src={profilePic}/>
                            <div
                                className="landing__profile-edit--button"
                                onClick={profileEditOpen}>
                                <BannerEditSVG/>
                            </div>
                        </div>
                    </div>
                    <div
                        className="landing__banner-edit--button"
                        onClick={bannerEditOpen}>
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
                <div className="apparatibus">
                    <div className="apparatibus__container">
                        <div className="apparatibus--vehicles">

                        </div>
                        <div className="apparatibus--boats">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;
