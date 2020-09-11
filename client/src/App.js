// Package Requirements
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Local Requirements
import Splash from './components/Splash';
import Main from './components/Main';

// Access "auth_token" -- never pass to props
const token = window.localStorage.getItem('auth_token');

// React Component
function App() {


// ---- Component Render ---- //

    // -- TODO --
    // need to validate for undefined,etc tokens

    // Render
    return (
        <BrowserRouter>
            {token ? <Main/> : <Splash/>}
        </BrowserRouter>
    );
}

export default App;
