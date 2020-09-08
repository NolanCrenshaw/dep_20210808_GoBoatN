// Package Requirements
import React from 'react';
import { BrowserRoute } from 'react-router-dom';

// Local Requirements
import Splash from './components/Splash';
import Main from './components/Main';


function App() {

    // Access "auth_token" -- never pass to props
    const authCheck = window.localStorage.getItem('auth_token')

    return (
        <BrowserRoute>
            {authCheck ? <Main/> : <Splash/>}
        </BrowserRoute>
    );
}

export default App;
