import React from "react";

import HomeButton from './navbar_buttons/HomeButton';
import BoatsButton from './navbar_buttons/BoatsButton';
import VehiclesButton from './navbar_buttons/VehiclesButton';
import RiversButton from './navbar_buttons/RiversButton';
import ProfileEditButton from './navbar_buttons/ProfileEditButton';
import LogoutButton from './navbar_buttons/LogoutButton';

import '../styles/header.css';


const Header = () => {

// ---- Component Render ---- //

    // Render
    return(
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
    );
};

export default Header;
