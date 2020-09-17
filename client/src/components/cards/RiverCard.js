import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../styles/rivercard.css';
import Rivers from '../Rivers';


// React Component
const RiverCard = props => {

    // State

    // Listen

    // Function
    const navToRiver = () => {
        return (
            <Redirect
                to={`/rivers/${props.river[0].id}`}/>
        )
    };

// ---- Component Render ---- //

    // Render
    return (
        <div className="riverCard-root--container">
            <div
                className="riverCard"
                onClick={navToRiver}>
                <div className="riverCard__sidebox"></div>
                <div className="riverCard__text-container">
                    <div className="riverCard__name">
                        <span>{props.river[0].name}</span>
                    </div>
                    <div className="riverCard__info-container">
                        <div className="riverCard__info--class">
                            <span>{props.river[0].class_designation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default RiverCard;
