import React, { useState } from 'react';
import { BASE_URL, IMG_KEY } from '../config';
import VehicleCard from './cards/VehicleCard';
import '../styles/vehicles.css';

// React Component
const Vehicles = props => {

    const token = window.localStorage.getItem("auth_token")
    const vehicleSprites = [
        {title: "Car", sprite: "carSprite.png"},
        {title: "Truck", sprite: "pickupSprite.png"},
        {title: "SUV", sprite: "suvSprite.png"}
    ]


    // Vehicle State
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [occupancy, setOccupancy] = useState(1);
    const [spriteOption, setSpriteOption] = useState(vehicleSprites[0].sprite);

    // Component State
    const [nameRequired, setNameRequired] = useState("no-error");
    const [makeRequired, setMakeRequired] = useState("no-error");

    // Listen
    const updateName = e => setName(e.target.value);
    const updateMake = e => setMake(e.target.value);
    const updateOccupancy = e => setOccupancy(e.target.value);
    const updateSpriteOption = e => setSpriteOption(e.target.value);

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
            user_id: props.user.id,
            occupancy: occupancy,
            sprite: spriteOption
        }
        const res = await fetch(`${BASE_URL}/api/vehicles/`, {
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
            window.location.reload();
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
                            <VehicleCard vehicle={vehicle}/>
                        )}
                    </div>
                </div>
                <div className="vehicles__create--header">
                    <span>Add a vehicle to your collection</span>
                </div>
                <div className="vehicles__create--container">
                    <div className="create-vehicle__img--container">
                        <span className="create-vehicle__img--instruct">
                            Pick an image for your vehicle
                        </span>
                        <div className="create-vehicle__img-form">
                            { vehicleSprites.map(vehicle =>
                                <div className="vehicle-sprite--container">
                                    <div className="vehicle-sprite__img">
                                        <img src={`${IMG_KEY}${vehicle.sprite}`}/>
                                    </div>
                                    <span>{vehicle.title}</span>
                                    <input
                                        type="radio"
                                        onClick={updateSpriteOption}
                                        value={vehicle.sprite}
                                        checked={spriteOption === vehicle.sprite} />
                                </div>
                            )}
                        </div>
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
        </div>
    )
}
export default Vehicles;
