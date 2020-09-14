import React from 'react';
import '../styles/vehicles.css';

// React Component
const Vehicles = props => {

    // State

    // Listen

    // Functions


// ---- Component Render ---- //

    // Render
    return (
        <div className="vehicles-root--container">
            <div className="vehicles">
                <div className="vehicles__display-c">
                    <div className="vehicles__display">
                        { props.vehicles.map((vehicle) =>
                            <div
                                className="vehicle-card"
                                key={vehicle.id}>
                                <span>{vehicle.name}</span>
                                <span>{vehicle.make}</span>
                                <span>{vehicle.occupancy}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="vehicles__notifications-c">

                </div>
            </div>
        </div>
    )
}
export default Vehicles;
