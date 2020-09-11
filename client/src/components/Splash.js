import React, { useState } from 'react';
import { AUTH_URL } from '../config';
import Signup from './Signup';
import '../styles/splash.css';


// React Component
const Splash = () => {

    // Sign up Modal State
    const [signupShow, setSignupShow] = useState("signup-modal--hidden")

    // Log in State & Listen
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    // Log in Function
    const login = async () => {
        const res = await fetch(`${AUTH_URL}/login`, {
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
            if (json.auth_token !== undefined) {
                window.localStorage.setItem('auth_token', json.auth_token);
                window.location.reload();
            }
        }
    };

    // Demo User Function
    const demoUser = async () => {
        const demoEmail = "demo@goboatn.com", demoPassword = "demoShow123";
        const speed = 50
        let i = 1, j = 1;

        // Clear Inputs
        setEmail("")
        setPassword("")

        // Ghost Writer Functions
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

        // Demo Fetch Function
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

    // Signup Toggle Function
    const toggleSignup = () => {
        if (signupShow === "signup-modal--hidden") {
            setSignupShow("signup-modal--visible");
        } else {
            setSignupShow("signup-modal--hidden");
        }
    }


// ---- Component Render ---- //

    // Render
    return (
        <div className="splash-root--container">
            <div className="splash--container">
                <div className="splash__margin swmleft"></div>
                <div className="splash__center">
                    <div className="splash__center--logo">
                        <div className="splash__logo">
                            <span>Go Boat</span>
                            <span className="splash__logo--odd">i</span>
                            <span>n</span>
                            <span className="splash__logo--odd">g</span>
                            <img src="https://img.icons8.com/ios/50/000000/canoe-slalom.png"/>
                        </div>
                    </div>
                    <div className="splash__center--main">
                        <div className={signupShow}>
                            <div className="signup--container">
                                <Signup toggle={toggleSignup}/>
                            </div>
                        </div>
                        <div className="splash__form--container">
                            <div className="splash__form--login-c">
                                <input
                                    className="splash__inputs"
                                    id="splash-login__email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={updateEmail} />
                                <input
                                    className="splash__inputs"
                                    id="splash-login__password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={updatePassword} />
                                <div
                                    className="splash__button-c"
                                    onClick={login}>
                                    <div
                                        className="splash__button"
                                        id="splash__button--login">
                                        <span>Log in</span>
                                    </div>
                                </div>
                                <div className="splash__divider"/>
                                <div
                                    className="splash__button-c"
                                    onClick={demoUser}>
                                    <div
                                        className="splash__button"
                                        id="splash__button--demo">
                                        <span>Demo User</span>
                                    </div>
                                </div>
                                <div className="splash__divider"/>
                                <div
                                    className="splash__button-c"
                                    onClick={toggleSignup}>
                                    <div
                                        className="splash__button"
                                        id="splash__button--signup">
                                        <span>Sign up</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="splash__center--credit-c">
                        <div className="splash__center--credit">
                            <span>
                                Photo by <a href="https://unsplash.com/@j_wedge?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Josh Wedgwood</a> on <a href="https://unsplash.com/s/photos/river-etive?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="splash__margin swmright">
                </div>
            </div>
        </div>
    )
}
export default Splash;
