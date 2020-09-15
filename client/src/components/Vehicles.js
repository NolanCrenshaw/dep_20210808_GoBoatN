import React, { useState } from 'react';
import { API_URL } from '../config';
import '../styles/vehicles.css';

// React Component
const Vehicles = props => {

    // Vehicle State
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [occupancy, setOccupancy] = useState("");

    // Component State
    const token = window.localStorage.getItem("auth_token")
    const [nameRequired, setNameRequired] = useState("no-error");
    const [makeRequired, setMakeRequired] = useState("no-error");

    // Listen
    const updateName = e => setName(e.target.value);
    const updateMake = e => setMake(e.target.value);
    const updateOccupancy = e => setOccupancy(e.target.value);

    // Create a Vehicle Function
    const createVehicle = async () => {
        if (name.length === 0 ) {
            setNameRequired("erroring");
            if (make.length === 0) {
                setMakeRequired("erroring");
            };
            return;
        };

        const vehicle = {
            name: name,
            make: make,
            occupancy: occupancy,
        }
        const res = await fetch(`${API_URL}/vehicles/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(vehicle),
        });
        if (!res.ok) {
            // -- TODO -- Handling
            console.log("createVehicle res failure");
        } else {
            return;
        }
    };

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
            <div className="vehicles__create--container">
                <div className="create-vehicle__img--container">

                </div>
                <div className="vehicles__create">
                    <div className="create-vehicle__form">
                        <input
                            className="create-vehicle__input"
                            id="create-vehicle__name"
                            type="text"
                            placeholder="Name for vehicle"
                            value={name}
                            onChange={updateName} />
                        <input
                            className="create-vehicle__input"
                            id="create-vehicle__make"
                            type="text"
                            placeholder="Make of vehicle"
                            value={make}
                            onChange={updateMake} />
                        <div className="create-vehicle__select--container">
                            <label>Max Occupancy</label>
                            <select
                                className="create-vehicle__select"
                                id="create-vehicle__occupancy"
                                value={occupancy}
                                onChange={updateOccupancy}>
                                <option value="1" >1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                            </select>
                        </div>
                        <div
                            className="create-vehicle__form-button"
                            onClick={createVehicle}>
                            <span>Create vehicle</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vehicles;
