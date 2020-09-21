import React from 'react';
import { IMG_KEY } from '../../config';
import '../../styles/vehiclecard.css';


// React Component
const VehicleCard = props => {


// ---- Component Render ---- //

    // Render
    return (
        <div
            className="vehicle-card"
            key={props.vehicle.id}>
            <div className="vehicle-card__img">
                <img src={`${IMG_KEY}${props.vehicle.sprite}`}/>
            </div>
            <div className="vehicle-card__textbox--container">
                <div className="vehicle-card__textbox">
                    <span>Name:</span>
                    <span>{props.vehicle.name}</span>
                    <span>Make:</span>
                    <span>{props.vehicle.make}</span>
                    <span>Occupancy:</span>
                    <span>{props.vehicle.occupancy}</span>
                </div>
            </div>
        </div>
    )
};
export default VehicleCard;
