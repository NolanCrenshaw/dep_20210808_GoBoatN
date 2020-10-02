import React, { useState } from 'react';
import { BASE_URL, IMG_KEY } from '../config';
import '../styles/createvehicle.css';

const CreateVehicle = props => {

    const token = window.localStorage.getItem("auth_token")
    const vehicleSprites = [
        {title: "Car", sprite: "carSprite.png"},
        {title: "Truck", sprite: "pickupSprite.png"},
        {title: "SUV", sprite: "suvSprite.png"},
        {title: "white_tacoma", sprite: "white_tacoma.png"},
        {title: "blue_golf", sprite: "blue_golf.png"},
        {title: "silver_pickup", sprite: "silver_pickup.png"},
        {title: "blue_motorcycle", sprite: "blue_motorcycle.png"},
        {title: "blue_chevy_truck", sprite: "blue_chevy_truck.png"},
        {title: "Toyota-car", sprite: "Toyota-Car.png"},
        {title: "red_range_rover", sprite: "red_range_rover.png"},
        {title: "orange_sportbike", sprite: "orange_sportbike.png"},
        {title: "mint_classic_pickup", sprite: "mint_classic_pickup.png"},
        {title: "black_trek_bike", sprite: "black_trek_bike.png"},
        {title: "black_transam", sprite: "black_transam.png"},
        {title: "black_ram", sprite: "black_ram.png"},
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
