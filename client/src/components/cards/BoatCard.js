import React from 'react';
import { IMG_KEY } from '../../config';
import '../../styles/boatcard.css';


// React Component
const BoatCard = props => {


// ---- Component Render ---- //

    // Render
    return (
        <div className="boat-card-root--container">
            <div
                className="boat-card"
                key={props.boat.id}>
                <div className="boat-card__img">
                    <img src={`${IMG_KEY}${props.boat.sprite}`}/>
                </div>
                <div className="boat-card__textbox--container">
                    <div className="boat-card__textbox">
                        <div className="boat-card__name">
                            <span>Name:</span>
                            <span>{props.boat.name}</span>
                        </div>
                        <div className="boat-card__make">
                            <span>Make:</span>
                            <span>{props.boat.make}</span>
                        </div>
                        <div className="boat-card__occupancy">
                            <span>Occupancy:</span>
                            <span>{props.boat.occupancy}</span>
                        </div>
                    </div>
                <div className="boat-card__delete">
                    <img src="https://img.icons8.com/dusk/64/000000/delete-forever.png"/>
                </div>
                </div>
            </div>
        </div>
    )
}
export default BoatCard;
