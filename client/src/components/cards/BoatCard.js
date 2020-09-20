import React from 'react';
import { IMG_KEY } from '../../config';
import '../../styles/boatcard.css';


// React Component
const BoatCard = props => {


// ---- Component Render ---- //

    // Render
    return (
        <div
            className="boat-card"
            key={props.boat.id}>
            <div className="boat-card__img">
                <img src={`${IMG_KEY}${props.boat.sprite}`}/>
            </div>
            <div className="boat-card__textbox--container">
                <div className="boat-card__textbox">
                    <span>{props.boat.name}</span>
                    <span>{props.boat.make}</span>
                    <span>{props.boat.occupancy}</span>
                </div>
            </div>
        </div>
    )
}
export default BoatCard;
