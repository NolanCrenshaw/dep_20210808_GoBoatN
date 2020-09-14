import React, { useState } from 'react';
import '../styles/boats.css';

// React Component
const Boats = props => {

    // State
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [occupancy, setOccupancy] = useState("");

    // Listen
    const updateName = e => setName(e.target.value);
    const updateMake = e => setMake(e.target.value);
    const updateOccupancy = e => setOccupancy(e.target.value);

    // Functions
    const createBoat = async () => {

    }

// ---- Component Render ---- //

    // Render
    return (
        <div className="boats-root--container">
            <div className="boats">
                <div className="boats__display-c">
                    <div className="boats__display">
                        { props.boats.map((boat) =>
                            <div
                                className="boat-card"
                                key={boat.id}>
                                <span>{boat.name}</span>
                                <span>{boat.make}</span>
                                <span>{boat.occupancy}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="boats__create-c">
                    <div className="boats__create">
                        <form
                            id="create_boat_form"
                            method="POST"
                            onClick={createBoat}>
                            <input
                                type="text"

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Boats;
