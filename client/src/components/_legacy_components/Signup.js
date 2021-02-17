import React, { useState } from 'react';
import { BASE_URL } from '../config';
// import '../styles/signup.css';

const Signup = props => {

    // State & Listen
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirm, setConfirm] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [zipcode, setZipcode] = useState();
    const updateUsername = e => setUsername(e.target.value);
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateConfirm = e => setConfirm(e.target.value);
    const updateFirstname = e => setFirstname(e.target.value);
    const updateLastname = e => setLastname(e.target.value);
    const updateZipcode = e => setZipcode(e.target.value);

    // Sign up Function
    const signup = async () => {
        if (password !== confirm) {
            // -- TODO -- Handling
            console.log('signup password !== confirm');
            return;
        };
        const user = {
            username: username,
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            zipcode: zipcode,
        };
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok) {
            // -- TODO -- Handling
            console.log("signup res failure");
        } else {
            const json = await res.json();
            if (json.auth_token === undefined) {
                // -- TODO -- Handling
                console.log("auth_token === undefined");
            } else {
                window.localStorage.setItem('auth_token', json.auth_token);
                window.location.reload();
            }
        };
    };


// ---- Component Render ---- //

    // Render
    return (
        <div className="signup-root--container">
            <div className="signup__center--main">
                <div className="signup__form--container">
                    <div
                        className="signup__form--close-button"
                        onClick={props.toggle}>
                        <img src="https://img.icons8.com/color/40/000000/x-coordinate.png" alt=""/>
                    </div>
                    <div className="signup__form--signup-c">
                        <input
                            className="signup__inputs"
                            id="signup__username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={updateUsername} />
                        <input
                            className="signup__inputs"
                            id="signup__email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail} />
                        <div className="signup__divider"/>
                        <input
                            className="signup__inputs"
                            id="signup__password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword} />
                        <input
                            className="signup__inputs"
                            id="signup__confirm"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirm}
                            onChange={updateConfirm} />
                        <div className="signup__divider"/>
                        <input
                            className="signup__inputs"
                            id="signup__firstname"
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={updateFirstname} />
                        <input
                            className="signup__inputs"
                            id="signup__lastname"
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={updateLastname} />
                        <input
                            className="signup__inputs"
                            id="signup__zipcode"
                            type="text"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={updateZipcode} />
                        <div className="signup__divider"/>
                        <div
                            className="signup__button-c"
                            onClick={signup}>
                            <div
                                className="signup__button"
                                id="signup__button--login">
                                <span>Sign Up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;
