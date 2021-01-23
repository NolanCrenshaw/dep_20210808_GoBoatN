import React, { useState } from "react";
import BoatCard from "./cards/BoatCard";
import AddBoat from "./subComponents/AddBoat";
import CreateBoat from "./CreateBoat";
// import '../styles/boats.css';

// React Component
const Boats = (props) => {
  const token = window.localStorage.getItem("auth_token");

  // Create Modal State
  const [createShow, setCreateShow] = useState("create-modal--hidden");

  // Boat State
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [occupancy, setOccupancy] = useState(1);

  // Component State
  const [nameRequired, setNameRequired] = useState("no-error");
  const [makeRequired, setMakeRequired] = useState("no-error");

  // Listen
  const updateName = (e) => setName(e.target.value);
  const updateMake = (e) => setMake(e.target.value);
  const updateOccupancy = (e) => setOccupancy(e.target.value);

  // Create Toggle Function
  const toggleCreate = () => {
    // -- TODO - Handling
    if (name.length === 0) {
      setNameRequired("erroring");
      if (make.length === 0) {
        setMakeRequired("erroring");
      }
      return;
    }
    if (createShow === "create-modal--hidden") {
      setCreateShow("create-modal--visible");
    } else {
      setCreateShow("create-modal--hidden");
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
              occupancy={occupancy}
            />
          </div>
        </div>
        <div className="boats__display-c">
          <div className="boats__display">
            {props.boats.map((boat) => (
              <BoatCard boat={boat} key={boat.id} />
            ))}
            <AddBoat toggle={toggleCreate} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Boats;
