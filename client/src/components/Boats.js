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
                        <div className="create-boat__form">
                            <input
                                className="create-boat__input"
                                id="create-boat__name"
                                type="text"
                                placeholder="Name for boat"
                                value={name}
                                onChange={updateName} />
                            <input
                                className="create-boat__input"
                                id="create-boat__make"
                                type="text"
                                placeholder="Make of boat"
                                value={make}
                                onChange={updateMake} />
                            <select
                                className="create-boat__select"
                                id="create-boat__occupancy"
                                placeholder="How many people fit in this boat?"
                                value={occupancy}
                                onChange={updateOccupancy} >
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                            </select>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Boats;
