import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import Landing from './Landing';
import Boats from './Boats';
import Vehicles from './Vehicles';
import RiverPage from './RiverPage';
import Rivers from './Rivers';
import '../styles/main.css';

const token = window.localStorage.getItem("auth_token");

// React Component
const Main = () => {

    // Page State
    const [caput, setCaput] = useState("");
    const [river, setRiver] = useState({});

    // User State
    const [user, setUser] = useState({})
    const [userBoats, setUserBoats] = useState([])
    const [userVehicles, setUserVehicles] = useState([])


    const profile_pic = require("../images/jpg/default-profile-pic.jpg");

    // Log out Function
    const logout = () => {
        window.localStorage.removeItem('auth_token');
        window.location.reload();
    }

    // Caput Toggle Function
    let caputToggle;
    if (caput==="boats") {
        caputToggle = <Boats
                        user={user}
                        boats={userBoats}
                        caput={setCaput}/>
    } else if (caput==="vehicles") {
        caputToggle = <Vehicles
                        user={user}
                        vehicles={userVehicles}
                        caput={setCaput}/>
    } else if (caput==="riverPage") {
        caputToggle = <RiverPage
                        user={user}
                        river={river}
                        caput={setCaput}/>
    } else if (caput==="landing") {
        caputToggle = <Landing />
    } else {
        caputToggle = <Rivers
                        caput={setCaput}/> // changed for dev.
    }

    // Switch Board Button Functions
    const landingRender = () => setCaput("landing");
    const boatsRender = () => setCaput("boats");
    const vehiclesRender = () => setCaput("vehicles");
    const riversRender = () => setCaput("rivers");

    // Component Based Functions
    useEffect(() => {
        // Fetch User by <auth_token>
        const getUser = async () => {
            const res = await fetch(`${BASE_URL}/api/users/token`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("getUser res failure");
            } else {
                const json = await res.json();
                setUser(json.user);
                setUserBoats(json.boats);
                setUserVehicles(json.vehicles);
            }
        };
        // -- TODO -- set profile picture
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
                                id="main-header__button--home"
                                onClick={landingRender}>
                                <span>Home</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--boats"
                                onClick={boatsRender}>
                                <span>Your boats</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--vehicles"
                                onClick={vehiclesRender}>
                                <span>Your vehicles</span>
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
                                id="main-header__button--trips"
                                onClick={riversRender}>
                                <span>Rivers</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--settings">
                                <span>Settings</span>
                            </div>
                            <div className="main-switch-board__divider"/>
                            <div
                                className="main-header__button"
                                id="main-header__button--logout"
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
                                { caputToggle }
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
                            {/* <div className="vita-boats--container">
                                {userBoats.map((boat) =>
                                    <div key={boat.id}>
                                        <span>{ boat.name }</span>
                                        <span>{ boat.make }</span>
                                    </div>
                                )}
                            </div> */}
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
