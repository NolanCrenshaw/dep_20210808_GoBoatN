import React, { useState } from 'react';
import { AUTH_URL } from '../config';


const Signup = () => {

    // Sign up State & Listen
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
        const res = await fetch(`${AUTH_URL}/signup`, {
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
            if (json.auth_token !== undefined) {
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
                    <div className="signup__form--login-c">
                        <input
                            className="signup__inputs"
                            id="signup-login__email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={updateEmail} />
                        <input
                            className="signup__inputs"
                            id="signup-login__password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updatePassword} />
                        <div
                            className="signup__button-c"
                            onClick={signup}>
                            <div
                                className="signup__button"
                                id="signup__button--login">
                                <span>Sign Up</span>
                            </div>
                        </div>
                        <div className="signup__divider"/>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Signup;
