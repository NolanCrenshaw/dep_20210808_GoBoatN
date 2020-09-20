import React from 'react'                                ;
import '../../styles/boatcard.css'


// React Component
const BoatCard = props => {


// ---- Component Render ---- //

    // Render
    return (
        <div
            className="boat-card"
            key={props.boat.id}>
            <span>{props.boat.name}</span>
            <span>{props.boat.make}</span>
            <span>{props.boat.occupancy}</span>
            <span>{props.boat.sprite}</span>
        </div>
    )
}
export default BoatCard;
