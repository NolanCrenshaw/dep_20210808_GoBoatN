import React, { useState } from 'react';
import { BASE_URL, IMG_KEY } from '../config';
import '../styles/createvehicle.css';

const CreateVehicle = props => {

    const token = window.localStorage.getItem("auth_token")
    const vehicleSprites = [
        {title: "Car", sprite: "carSprite.png"},
        {title: "Truck", sprite: "pickupSprite.png"},
        {title: "SUV", sprite: "suvSprite.png"}
    ]

    // State
    const [spriteOption, setSpriteOption] = useState(vehicleSprites[0].sprite);

    // Listen
    const updateSpriteOption = e => setSpriteOption(e.target.value);


    // Create a Vehicle Function
    const createVehicle = async () => {

        const vehicle = {
            name: props.name,
            make: props.make,
            user_id: props.user.id,
            occupancy: props.occupancy,
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
        <div className="vehicle-modal--container">
            <div className="create-vehicle__img--container">
                <span className="create-vehicle__img--instruct">
                    Select an image for your vehicle
                </span>
                <div className="create-vehicle__img-form">
                    { vehicleSprites.map(vehicle =>
                        <div className="vehicle-sprite--container">
                            <div className="vehicle-sprite__img">
                                <img src={`${IMG_KEY}${vehicle.sprite}`}/>
                            </div>
                            <input
                                type="radio"
                                onClick={updateSpriteOption}
                                value={vehicle.sprite}
                                checked={spriteOption === vehicle.sprite} />
                        </div>
                    )}
                </div>
                <div
                    className="create-vehicle__button"
                    onClick={createVehicle}>
                    <span>Submit</span>
                </div>
            </div>
        </div>
    )
};
export default CreateVehicle;
