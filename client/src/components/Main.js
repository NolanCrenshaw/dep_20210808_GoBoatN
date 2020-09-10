import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';
import Landing from './Landing'
import '../styles/main.css';


const token = window.localStorage.getItem("auth_token");

// React Component
const Main = () => {

    // State
    const [user, setUser] = useState({})
    const [caput, setCaput] = useState("landing");


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
                <div className="main__header"></div>
                <div className="main__body">
                    <div className="main__caput">
                        <div className="main__caput--switch">
                            { caput==="landing" ? <Landing/> : <Landing/> }
                        </div>
                    </div>
                    <div className="main__vita">
                        <div className="vita__profile-pic">

                        </div>
                        <div className="vita-bio--container">
                            <div className="vita-bio__username">
                                <span>{ user.username }</span>
                            </div>
                            <div className="vita-bio__firstname">
                                <span>{ user.firstname }</span>
                            </div>
                            <div className="vita-bio__lastname">
                                <span>{ user.lastname }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main;
