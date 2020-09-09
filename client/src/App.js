// Package Requirements
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Local Requirements
import Splash from './components/Splash';
import Main from './components/Main';


function App() {

    // Access "auth_token" -- never pass to props
    const authCheck = window.localStorage.getItem('auth_token')

    return (
        <BrowserRouter>
            {authCheck ? <Main/> : <Splash/>}
        </BrowserRouter>
    );
}

export default App;
