import React from "react";

// React Component
const VehicleCard = ({ vehicle }) => {
  // Delete Vehicle Function
  // const deleteVehicle = async () => {
  //   const res = await fetch(
  //     `${BASE_URL}/api/vehicles/${props.vehicle.id}/delete`,
  //     {
  //       method: "DELETE",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   if (!res.ok) {
  //     // -- TODO - Handling
  //     console.log("deleteVehicle res failure");
  //   } else {
  //     window.location.reload();
  //   }
  // };

  // ---- Component Render ---- //

  // Render
  return (
    <div className="vehiclecard-container card">
      <div className="vehicle-card__img">
        {/* <img src={`${IMG_KEY}${props.vehicle.sprite}`} /> */}
      </div>
      <div className="vehicle-card__textbox--container">
        <div className="vehicle-card__textbox">
          <div className="vehicle-card__name">
            <span>Name:</span>
            <span>{vehicle.name}</span>
          </div>
          <div className="vehicle-card__occupancy">
            <span>Occupancy:</span>
            <span>{vehicle.occupancy}</span>
          </div>
        </div>
        {/* <div className="vehicle-card__delete">
          <img src="https://img.icons8.com/dusk/64/000000/delete-forever.png" />
        </div> */}
      </div>
    </div>
  );
};
export default VehicleCard;
