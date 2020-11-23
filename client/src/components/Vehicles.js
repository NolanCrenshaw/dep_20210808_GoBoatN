import React, { useState } from 'react';
import VehicleCard from './cards/VehicleCard';
import AddVehicle from './subComponents/AddVehicle';
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
                            occupancy={occupancy}/>
                    </div>
                </div>
                <div className="vehicles__display-c">
                    <div className="vehicles__display">
                        { props.vehicles.map((vehicle) =>
                            <VehicleCard vehicle={vehicle}/>
                        )}
                        <AddVehicle toggle={toggleCreate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vehicles;
