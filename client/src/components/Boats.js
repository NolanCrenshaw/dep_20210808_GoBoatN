import React, { useState } from 'react';
import BoatCard from './cards/BoatCard';
import CreateBoat from './CreateBoat';
import '../styles/boats.css';


// React Component
const Boats = props => {

    const token = window.localStorage.getItem("auth_token")

    // Create Modal State
    const [createShow, setCreateShow] = useState("create-modal--hidden")

    // Boat State
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
        <div className="boats-root--container">
            <div className="boats">
                <div className={createShow}>
                    <div className="boats__modal">
                        <CreateBoat
                            toggle={toggleCreate}
                            user={props.user}
                            name={name}
                            make={make}
                            occupancy={occupancy}/>
                    </div>
                </div>
                <div className="boats__display-c">
                    <span className="boats__display--header">
                        Your Boats:
                    </span>
                    <div className="boats__display">
                        { props.boats.map((boat) =>
                            <BoatCard boat={boat}/>
                        )}
                        <div className="boat-card-root--container">
                            <div
                                className="boat-card add-boat-card">
                                <div className="boat-card__header--create">
                                    <div className="boat-card__header">
                                        <span>Add a Boat</span>
                                    </div>
                                </div>
                                <div className="boat-card__textbox--container">
                                    <div className="boat-card__textbox">
                                        <div className="boat-card__name">
                                            <span>Name:</span>
                                            <input
                                                className="create-boat__input"
                                                id="create-boat__name"
                                                type="text"
                                                placeholder=""
                                                value={name}
                                                onChange={updateName} />
                                        </div>
                                        <div className="boat-card__make">
                                            <span>Make:</span>
                                            <input
                                                className="create-boat__input"
                                                id="create-boat__make"
                                                type="text"
                                                placeholder=""
                                                value={make}
                                                onChange={updateMake} />
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
                                            onClick={toggleCreate}>
                                            <img src="https://img.icons8.com/officel/80/000000/plus.png"/>
                                        </div>
                                    </div>
                                <div className="boat-card__delete">
                                    <img src="https://img.icons8.com/dusk/64/000000/delete-forever.png"/>
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
export default Boats;
