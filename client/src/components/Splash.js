import React, { useState } from 'react';
import { AUTH_URL } from "../config";


// Authorization
const token = window.localStorage.getItem("auth_token");

// React Component
const Splash = () => {

    // Log in State & Listen
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    // Sign up State & Listen
    const [username, setUsername] = useState();
    const [emailSignup, setEmailSignup] = useState();
    const [passwordSignup, setPasswordSignup] = useState();
    const [confirm, setConfirm] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [zipcode, setZipcode] = useState();
    const updateUsername = e => setUsername(e.target.value);
    const updateEmailSignup = e => setEmailSignup(e.target.value);
    const updatePasswordSignup = e => setPasswordSignup(e.target.value);
    const updateConfirm = e => setConfirm(e.target.value);
    const updateFirstname = e => setFirstname(e.target.value);
    const updateLastname = e => setLastname(e.target.value);
    const updateZipcode = e => setZipcode(e.target.value);

    // Log in Function
    const login = async () => {
        const res = await fetch(`${AUTH_URL}/`, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: `${email}`, password: `${password}` }),
        });
        if (!res.ok) {
            // -- TODO -- Validation
            console.log("login res failure");
        } else {
            // <"auth_token"> Storage
            const json = await res.json()
            if (json.auth_token != undefined) {
                window.localStorage.setItem('auth_token', json.auth_token);
                window.location.reload();
            }
        }
    };

    // Sign up Function
    const signup = async () => {
        if (passwordSignup !== confirm) {
            // -- TODO -- Handling
            console.log('signup password !== confirm');
            return;
        };
        const user = {
            username: username,
            email: emailSignup,
            password: passwordSignup,
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

    // Demo User Function
    const demoUser = async () => {
        const demoEmail = "demo@riverrunner.com", demoPassword = "demoShow123";
        const speed = 50, i = 1, j = 1;

        const ghostWriteEmail = () => {
            if (i <= demoEmail.length) {
                let text = demoEmail.slice(0,i);
                setEmail(text);
                i++;
                setTimeout(ghostWriteEmail, speed);
            }
        }
        const ghostWritePassword = () => {
            if (j <= demoPassword.length) {
                let text = demoPassword.slice(0,j);
                setPassword(text);
                j++;
                setTimeout(ghostWritePassword, speed);
            }
        }
        ghostWriteEmail();
        setTimeout(ghostWritePassword, speed*demoEmail.length);

        const demo = async () => {
            const response = await fetch(`${AUTH_URL}/login`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: `${demoEmail}`, password: `${demoPassword}` }),
            });
            const json = await response.json()
            if (json.auth_token !== undefined) {
                window.localStorage.setItem('auth_token', json.auth_token)
                window.location.reload()
            }
        }
        setTimeout(demo, 1200);
    }


// ---- Component Render ---- //

    // Render
    return (
        <div className="splash-container">
            <h1>Hello World!</h1>
            <h3>Splash Page</h3>
        </div>
    )
}
export default Splash;
