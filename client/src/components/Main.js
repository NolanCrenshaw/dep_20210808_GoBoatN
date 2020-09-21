import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { BASE_URL, IMG_KEY } from '../config';
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
import ProfileEditButton from './navbar_buttons/ProfileEditButton';
import LogoutButton from './navbar_buttons/LogoutButton';
import TripCard from './cards/TripCard';
import '../styles/main.css';
import '../styles/alt/alt-main.css';
import TripPage from './TripPage';


// React Component
const Main = () => {

    // Page State
    const token = window.localStorage.getItem("auth_token");
    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`
    const [river, setRiver] = useState({});

    // Current User State
    const [user, setUser] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [profilePic, setProfilePic] = useState(defaultPic);
    const [userBoats, setUserBoats] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);


    // Functions
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
                setUserInvites(json.invites);
                setUserTrips(json.trips);
                if (json.user.profile_pic !== null) {
                    setProfilePic(`${IMG_KEY}${json.user.profile_pic}`)
                }
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
                            <ProfileEditButton/>
                            <div className="main-switch-board__divider"/>
                            <LogoutButton/>
                        </div>
                    </div>
                    <div className="main-header__right"></div>
                </div>
                <div className="main__body">
                    <div className="main__body--elements">
                        <Router>
                            <div className="main__caput">
                                <Switch>
                                    <Route
                                        exact
                                        path="/boats">
                                        <Boats
                                            user={user}
                                            boats={userBoats}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/vehicles">
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
                                        path="/rivers/:id"
                                        component={RiverPage}/>
                                    <Route
                                        path="/profile/edit">
                                        <ProfileEdit
                                            user={user}/>
                                    </Route>
                                    <Route
                                        exact
                                        path="/profile/:id"
                                        component={Profile}/>
                                    <Route
                                        exact
                                        path="/trips/:id"
                                        component={TripPage}/>
                                    <Route path="/">
                                        <Landing />
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                        <div className="main__vita">
                            <div className="vita__profile-pic--container">
                                <div className="vita__profile-pic">
                                    <img src={profilePic}/>
                                </div>
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
                            <span className="vita-trip--header">
                                Your Trips
                            </span>
                            <div className="vita-trip--container">
                                { userTrips[0]
                                    ? userTrips[0].map(trip => <TripCard trip={trip}/>)
                                    : <span>You should Create a trip!</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="main__footer">
                        <span>Footer</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main;
