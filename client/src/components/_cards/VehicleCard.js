import React from "react";
import { BASE_URL, IMG_KEY } from "../../config";
// import '../../styles/vehiclecard.css';

// React Component
const VehicleCard = (props) => {
  const token = window.localStorage.getItem("auth_token");

  // Delete Vehicle Function
  const deleteVehicle = async () => {
    const res = await fetch(
      `${BASE_URL}/api/vehicles/${props.vehicle.id}/delete`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) {
      // -- TODO - Handling
      console.log("deleteVehicle res failure");
    } else {
      window.location.reload();
    }
  };

  // ---- Component Render ---- //

  // Render
  return (
    <div className="vehicle-card-root--container">
      <div className="vehicle-card" key={props.vehicle.id}>
        <div className="vehicle-card__img">
          <img src={`${IMG_KEY}${props.vehicle.sprite}`} />
        </div>
        <div className="vehicle-card__textbox--container">
          <div className="vehicle-card__textbox">
            <div className="vehicle-card__name">
              <span>Name:</span>
              <span>{props.vehicle.name}</span>
            </div>
            <div className="vehicle-card__occupancy">
              <span>Occupancy:</span>
              <span>{props.vehicle.occupancy}</span>
            </div>
          </div>
          <div className="vehicle-card__delete" onClick={deleteVehicle}>
            <img src="https://img.icons8.com/dusk/64/000000/delete-forever.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehicleCard;
