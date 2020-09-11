import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import Landing from './Landing'
import '../styles/main.css';

const token = window.localStorage.getItem("auth_token");

// React Component
const Main = () => {

    // State
    const [user, setUser] = useState({})
    const [userPic, setUserPic] = useState("../images/jpg/default-profile-pic.jpg")
    const [caput, setCaput] = useState("landing");


    let profile_pic = require("../images/jpg/default-profile-pic.jpg");

    // Set Profile Picture Function
    // const profileSetter = () => {
    //     if (user.profile_pic) {
    //         const pro_pic = user.profile_pic
    //         // profile_pic = require(`${pro_pic}`)
    //         console.log("propic -->", pro_pic)
    //     }
    // }

    // Log out Function
    const logout = () => {
        window.localStorage.removeItem('auth_token');
        window.location.reload();
    }

    // Caput Toggle Function
    // const toggleCaput = screen => {
    //     if (screen === "landing") {
    //         setCaput("landing");
    //     } else if (screen === "boats") {
    //         setCaput("boats");
    //     } else if (screen === "vehicles") {
    //         setCaput("vehicles");
    //     }
    // }

    // Switch Board Button Functions
    const boatToggle = () => setCaput("boats")
    const vehicleToggle = () => setCaput("vehicles")
    const tripToggle = () => setCaput("trip")

    // Component Based Functions
    useEffect(() => {
        // Fetch User by <auth_token>
        const getUser = async () => {
            const res = await fetch(`${API_URL}/users/token`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                console.log("getUser res failure");
            } else {
                const json = await res.json();
                setUser(json);
            }
        };
        const setUserPic = () => {
            if (user.profile_pic) {
                setUserPic(`${user.profile_pic}`)
            }
        }
        getUser();
    }, [])


// ---- Component Render ---- //

    // Render
    return (
        <div className="main-root--container">
            <div className="main--container">
                <div className="main__header">
                    <div className="main-header__left"></div>
                    <div className="main-header__bulk">
                        <div className="main-header__switch-board">
                            <div
                                className="main-header__button"
                                id="main-header__button--one"
                                onClick={boatToggle}>
                                <span>Your boats</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--two"
                                onClick={vehicleToggle}>
                                <span>Your vehicles</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--three"
                                onClick={tripToggle}>
                                <span>Create a trip</span>
                            </div>
                            <div className="main-switch-board__graf-c">
                                <span>Go Boat</span>
                                <span className="main-switch__graf--odd">i</span>
                                <span>n</span>
                                <span className="main-switch__graf--odd">g</span>
                                <img src="https://img.icons8.com/ios/50/000000/canoe-slalom.png"/>
                            </div>
                            <div
                                className="main-header__button"
                                id="main-header__button--four">
                                <span>Search for trips</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--five">
                                <span>Settings</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--six"
                                onClick={logout}>
                                <span>Log out</span>
                            </div>
                        </div>
                    </div>
                    <div className="main-header__right"></div>
                </div>
                <div className="main__body">
                    <div className="main__body--elements">
                        <div className="main__caput">
                            <div className="main__caput--switch">
                                { caput==="landing" ? <Landing/> : <Landing/> }
                            </div>
                        </div>
                        <div className="main__vita">
                            <div className="vita__profile-pic">
                                <img src={profile_pic}/>
                            </div>
                            <div className="vita-bio--container">
                                <div className="vita-bio__username">
                                    <span>{ user.username }</span>
                                </div>
                                <div className="vita-bio__name">
                                    <span>{ user.firstname } { user.lastname }</span>
                                </div>
                                <div className="vita-bio__email">
                                    <span>{ user.email }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main__body--footer">

                    </div>
                </div>
                <div className="main__footer">

                </div>
            </div>
        </div>
    )
}
export default Main;
