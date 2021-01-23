import React, { useState } from "react";
// import '../../styles/addboat.css';


const AddBoat = props => {

    const token = window.localStorage.getItem("auth_token")

    // Create Modal State
    const [createShow, setCreateShow] = useState("create-modal--hidden")

    // Boat State
    const [name, setName] = useState("");
    const [occupancy, setOccupancy] = useState(1);

   // Component State
   const [nameRequired, setNameRequired] = useState("no-error");

    // Listen
    const updateName = e => setName(e.target.value);
    const updateOccupancy = e => setOccupancy(e.target.value);


// ---- Component Render ---- //

    // Render
    return(
        <div className="boat-card-root--container">
            <div
                className="boat-card add-boat-card">
                <div className="boat-card__img">
                    <div className="boat-card__header">
                        <span>Add a Boat</span>
                    </div>
                </div>
                <div className="boat-card__textbox--container">
                    <div className="boat-card__textbox">
                        <div className="add-boat__name">
                            <span>Name:</span>
                            <input
                                className="create-boat__input"
                                id="create-boat__name"
                                type="text"
                                placeholder=""
                                value={name}
                                onChange={updateName} />
                        </div>
                        <div className="boat-card__occupancy--create">
                            <span>Occupancy:</span>
                            <div className="create-boat__select--container">
                                <select
                                    className="create-boat__select"
                                    id="create-boat__occupancy"
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
                            className="create-boat__form-button"
                            onClick={props.toggleCreate}>
                            <img src="https://img.icons8.com/officel/80/000000/plus.png"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBoat;
