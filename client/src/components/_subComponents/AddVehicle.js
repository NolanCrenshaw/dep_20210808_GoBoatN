import React, { useState } from "react";
// import '../../styles/addvehicle.css';

const AddVehicle = (props) => {
  const token = window.localStorage.getItem("auth_token");

  // Create Modal State
  const [createShow, setCreateShow] = useState("create-modal--hidden");

  // Boat State
  const [name, setName] = useState("");
  const [occupancy, setOccupancy] = useState(1);

  // Component State
  const [nameRequired, setNameRequired] = useState("no-error");

  // Listen
  const updateName = (e) => setName(e.target.value);
  const updateOccupancy = (e) => setOccupancy(e.target.value);

  // ---- Component Render ---- //

  // Render
  return (
    <div className="vehicle-card-root--container">
      <div className="vehicle-card add-vehicle-card">
        <div className="vehicle-card__header--create">
          <div className="vehicle-card__header">
            <span>Add a Vehicle</span>
          </div>
        </div>
        <div className="vehicle-card__textbox--container">
          <div className="vehicle-card__textbox">
            <div className="add-vehicle__name">
              <span>Name:</span>
              <input
                className="create-vehicle__input"
                id="create-vehicle__name"
                type="text"
                placeholder=""
                value={name}
                onChange={updateName}
              />
            </div>
            <div className="vehicle-card__occupancy--create">
              <span>Occupancy:</span>
              <div className="create-vehicle__select--container">
                <select
                  className="create-vehicle__select"
                  id="create-vehicle__occupancy"
                  value={occupancy}
                  onChange={updateOccupancy}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
            <div
              className="create-vehicle__form-button"
              onClick={props.toggleCreate}
            >
              <img src="https://img.icons8.com/officel/80/000000/plus.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
