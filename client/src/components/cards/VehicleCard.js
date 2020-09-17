import React from 'react';
import '../../styles/rivercard.css';


// React Component
const VehicleCard = props => {

    // State

    // Listen

    // Function


// ---- Component Render ---- //

    // Render
    return (
        <div className="riverCard-root--container">
            <div className="riverCard">
                <div className="riverCard__sidebox"></div>
                <div className="riverCard__text-container">
                    <div className="vehicleCard__name">
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
export default VehicleCard;
