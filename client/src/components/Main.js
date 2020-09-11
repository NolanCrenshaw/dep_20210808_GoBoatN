import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import Landing from './Landing'
import '../styles/main.css';
import { imageURL, canoeBackgroundSlice } from '../images/canoe-background-slice';

const token = window.localStorage.getItem("auth_token");

// React Component
const Main = () => {

    // State
    const [user, setUser] = useState({})
    const [caput, setCaput] = useState("landing");

    // Component Variables
    const profile_pic = user.profile_pic || require('../images/jpg/default-profile-pic.jpg')

    // Functions
    const logout = () => {
        window.localStorage.removeItem('auth_token');
        window.location.reload();
    }

    // Component Based Functions
    useEffect(() => {
        // Fetch User by <auth_token>
        const getUser = async () => {
            const res = await fetch(`${API_URL}/user/token`, {
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
                                id="main-header__button--one">
                                <span>Add a boat</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--two">
                                <span>Add a vehicle</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--three">
                                <span>Create a trip</span>
                            </div>
                            <div className="main-switch-board__graf-c">
                                <span>Go Boat</span>
                                <span className="main-switch__graf--odd">i</span>
                                <span>n</span>
                                <span className="main-switch__graf--odd">g</span>
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
            </div>
        </div>
    )
}
export default Main;
