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
                                <span>One</span>
                            </div>
                            <div
                                className="main-header__button"
                                id="main-header__button--two">
                                <span>Two</span>
                            </div>
                            <div
                                className="main-header__button"
                                id="main-header__button--three">
                                <span>Three</span>
                            </div>
                            <div
                                className="main-header__button"
                                id="main-header__button--four">
                                <span>Four</span>
                            </div>
                            <div
                                className="main-header__button"
                                id="main-header__button--five">
                                <span>Five</span>
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
