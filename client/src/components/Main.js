import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import TripPage from './TripPage';
import Rivers from './Rivers';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import HomeButton from './navbar_buttons/HomeButton';
import BoatsButton from './navbar_buttons/BoatsButton';
import VehiclesButton from './navbar_buttons/VehiclesButton';
import RiversButton from './navbar_buttons/RiversButton';
import ProfileEditButton from './navbar_buttons/ProfileEditButton';
import LogoutButton from './navbar_buttons/LogoutButton';
import '../styles/main.css';
import '../styles/alt/alt-main.css';


// React Component
const Main = () => {
    // Redux Controls
    const dispatch = useDispatch();

    // Page State
    const token = window.localStorage.getItem("auth_token");
    const defaultPic = `${IMG_KEY}default-profile-pic.jpg`
    const [river, setRiver] = useState({});

    // Current User State
    const [user, setUser] = useState({});
    const [userTrips, setUserTrips] = useState([]);
    const [userInvites, setUserInvites] = useState([]);
    const [userFriends, setUserFriends] = useState([]);
    const [profilePic, setProfilePic] = useState(defaultPic);
    const [userBoats, setUserBoats] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);

    // Set Redux State Function
    const setState = (json) => {
        try {
            dispatch({
                type: "SET_USER",
                payload: {
                    user: json.user,
                    boats: json.boats,
                    vehicles: json.vehicles,
                    friends: json.friends,
                    invites: json.invites,
                    trips: json.trips
                }
            });
            console.log("setState() successful")
        } catch (e) {
            console.log("setState() failure");
            console.log("error: ", e);
        }
    };


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
                setState(json);

                // setUser(json.user);
                // setUserBoats(json.boats);
                // setUserVehicles(json.vehicles);
                // setUserFriends(json.friends);
                // setUserInvites(json.invites);
                // setUserTrips(json.trips);
                // if (json.user.profile_pic !== null) {
                //     setProfilePic(`${IMG_KEY}${json.user.profile_pic}`)
                // }
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
                                <span>i</span>
                                <span>n</span>
                                <span>g</span>
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
                                        exact
                                        path="/rivers/:id"
                                        component={RiverPage}/>
                                    <Route
                                        exact
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
                                    <Route
                                        exact
                                        path="/">
                                        <Landing
                                            user={user}
                                            trips={userTrips}
                                            friends={userFriends}
                                            invites={userInvites}/>
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
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
