import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from 'react-router-dom';
import { BASE_URL } from '../config';
import Landing from './Landing';
import Boats from './Boats';
import Vehicles from './Vehicles';
import RiverPage from './RiverPage';
import Rivers from './Rivers';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import HomeButton from './navbar_buttons/HomeButton';
import BoatsButton from './navbar_buttons/BoatsButton';
import VehiclesButton from './navbar_buttons/VehiclesButton';
import RiversButton from './navbar_buttons/RiversButton';
import ProfileButton from './navbar_buttons/ProfileButton';
import LogoutButton from './navbar_buttons/LogoutButton';
import '../styles/main.css';
import '../styles/alt/alt-main.css';


// React Component
const Main = () => {

    // Page State
    const token = window.localStorage.getItem("auth_token");
    const [river, setRiver] = useState({});

    // User State
    const [user, setUser] = useState({})
    const [userBoats, setUserBoats] = useState([])
    const [userVehicles, setUserVehicles] = useState([])

    // Temporary Profile Picture Set
    const profile_pic = require("../images/jpg/default-profile-pic.jpg");


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
                            <VehiclesButton/>
                            <div className="main-switch-board__divider"/>
                            <BoatsButton/>
                            <div className="main-switch-board__divider"/>
                            <HomeButton/>
                            <div className="main-switch-board__graf-c">
                                <span>Go Boat</span>
                                <span className="main-switch__graf--odd">i</span>
                                <span>n</span>
                                <span className="main-switch__graf--odd">g</span>
                                <img src="https://img.icons8.com/ios/50/000000/canoe-slalom.png"/>
                            </div>
                            <RiversButton/>
                            <div className="main-switch-board__divider"/>
                            <ProfileButton/>
                            <div className="main-switch-board__divider"/>
                            <LogoutButton/>
                        </div>
                        <div className="alt-main-header main-header__switch-board">
                            <div className="main-switch-board__graf-c">
                                <span>Go Boat</span>
                                <span className="main-switch__graf--odd">i</span>
                                <span>n</span>
                                <span className="main-switch__graf--odd">g</span>
                                <img src="https://img.icons8.com/ios/50/000000/canoe-slalom.png"/>
                            </div>
                            <div className="alt-main-switch-board--button-container">
                                <VehiclesButton/>
                                <div className="main-switch-board__divider"/>
                                <BoatsButton/>
                                <div className="main-switch-board__divider"/>
                                <HomeButton/>
                                <RiversButton/>
                                <div className="main-switch-board__divider"/>
                                <ProfileButton/>
                                <div className="main-switch-board__divider"/>
                                <LogoutButton/>
                            </div>
                        </div>
                    </div>
                    <div className="main-header__right"></div>
                </div>
                <div className="main__body">
                    <div className="main__body--elements">
                        <Router>
                            <div className="main__caput">
                                <Switch>
                                    <Route path="/boats">
                                        <Boats
                                            user={user}
                                            boats={userBoats}/>
                                    </Route>
                                    <Route path="/vehicles">
                                        <Vehicles
                                            user={user}
                                            vehicles={userVehicles}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/rivers">
                                        <Rivers/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/rivers/:id"
                                        component={RiverPage}>
                                    </Route>
                                    <Route
                                        exact
                                        path="/profile/edit">
                                        <ProfileEdit
                                            user={user}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/profile/:id"
                                        component={Profile}>
                                    </Route>
                                    <Route path="/">
                                        <Landing />
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
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
