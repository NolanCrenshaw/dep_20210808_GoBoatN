import React, { useState } from 'react';
import VehicleCard from './cards/VehicleCard';
import CreateVehicle from './CreateVehicle';
import '../styles/vehicles.css';

// React Component
const Vehicles = props => {

    const token = window.localStorage.getItem("auth_token")

    // Create Modal State
    const [createShow, setCreateShow] = useState("create-modal--hidden")

    // Vehicle State
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [occupancy, setOccupancy] = useState(1);

    // Component State
    const [nameRequired, setNameRequired] = useState("no-error");
    const [makeRequired, setMakeRequired] = useState("no-error");

    // Listen
    const updateName = e => setName(e.target.value);
    const updateMake = e => setMake(e.target.value);
    const updateOccupancy = e => setOccupancy(e.target.value);

    // Create Toggle Function
    const toggleCreate = () => {
        // -- TODO - Handling
        if (name.length === 0 ) {
            setNameRequired("erroring");
            if (make.length === 0) {
                setMakeRequired("erroring");
            };
            return;
        };
        if (createShow === "create-modal--hidden") {
            setCreateShow("create-modal--visible");
        } else {
            setCreateShow("create-modal--hidden")
        }
    };



// ---- Component Render ---- //

    // Render
    return (
        <div className="vehicles-root--container">
            <div className="vehicles">
                <div className={createShow}>
                    <div className="vehicles__modal">
                        <CreateVehicle
                            toggle={toggleCreate}
                            user={props.user}
                            name={name}
                            make={make}
                            occupancy={occupancy}/>
                    </div>
                </div>
                <div className="vehicles__display-c">
                    <span className="vehicles__display--header">
                        Your Vehicles:
                    </span>
                    <div className="vehicles__display">
                        { props.vehicles.map((vehicle) =>
                            <VehicleCard vehicle={vehicle}/>
                        )}
                        <div className="vehicle-card-root--container">
                            <div
                                className="vehicle-card add-vehicle-card">
                                <div className="vehicle-card__header--create">
                                    <div className="vehicle-card__header">
                                        <span>Add a vehicle</span>
                                    </div>
                                </div>
                                <div className="vehicle-card__textbox--container">
                                    <div className="vehicle-card__textbox">
                                        <div className="vehicle-card__name">
                                            <span>Name:</span>
                                            <input
                                                className="create-vehicle__input"
                                                id="create-vehicle__name"
                                                type="text"
                                                placeholder=""
                                                value={name}
                                                onChange={updateName} />
                                        </div>
                                        <div className="vehicle-card__make">
                                            <span>Make:</span>
                                            <input
                                                className="create-vehicle__input"
                                                id="create-vehicle__make"
                                                type="text"
                                                placeholder=""
                                                value={make}
                                                onChange={updateMake} />
                                        </div>
                                        <div className="vehicle-card__occupancy--create">
                                            <span>Occupancy:</span>
                                            <div className="create-vehicle__select--container">
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
                                                    <option value="7" >7</option>
                                                    <option value="8" >8</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="create-vehicle__form-button"
                                            onClick={toggleCreate}>
                                            <img src="https://img.icons8.com/officel/80/000000/plus.png"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vehicles;
