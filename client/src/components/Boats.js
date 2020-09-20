import React, { useState } from 'react';
import { BASE_URL } from '../config';
import '../styles/boats.css';


// React Component
const Boats = props => {

    // DOM Ref
    const imgFile = React.createRef();
    const token = window.localStorage.getItem("auth_token")

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

    // Create a Boat Function
    const createBoat = async () => {
        if (name.length === 0 ) {
            setNameRequired("erroring");
            if (make.length === 0) {
                setMakeRequired("erroring");
            };
            return;
        };
        const boat = {
            name: name,
            make: make,
            user_id: props.user.id,
            occupancy: occupancy,
            sprite: null
        }

        if (imgFile.current.files[0] !== undefined) {
            const formData = new FormData();
            formData.append('file', imgFile.current.files[0])

            const res = await fetch(`${BASE_URL}/api/bucket/upload`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("boatImage upload failure")
            } else {
                const json = await res.json()
                boat.sprite = json.sprite
            }
        }
        const res = await fetch(`${BASE_URL}/api/boats/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(boat),
        });
        if (!res.ok) {
            // -- TODO -- Handling
            console.log("createBoat res failure");
        } else {
            window.location.reload();
        }
    };

// ---- Component Render ---- //

    // Render
    return (
        <div className="boats-root--container">
            <div className="boats">
                    <div className="boats__display-c">
                        <div className="boats__display">
                            { props.boats.map((boat) =>
                                <div
                                    className="boat-card"
                                    key={boat.id}>
                                    <span>{boat.name}</span>
                                    <span>{boat.make}</span>
                                    <span>{boat.occupancy}</span>
                                </div>
                            )}
                        </div>
                    </div>
                <div className="boats__create--container">
                    <div className="create-boat__img--container">
                        <div className="create-boat__img-form">
                            <div className="create-boat__img-form--input">
                                <span>Choose a file to upload</span>
                                <input
                                    className="create-boat__img-upload"
                                    type="file"
                                    accept="image/*"
                                    name="file"
                                    ref={imgFile}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="boats__create">
                        <div className="create-boat__form">
                            <input
                                className="create-boat__input"
                                id="create-boat__name"
                                type="text"
                                placeholder="Name for boat"
                                value={name}
                                onChange={updateName} />
                            <input
                                className="create-boat__input"
                                id="create-boat__make"
                                type="text"
                                placeholder="Make of boat"
                                value={make}
                                onChange={updateMake} />
                            <div className="create-boat__select--container">
                                <label>Max Occupancy</label>
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
                                </select>
                            </div>
                            <div
                                className="create-boat__form-button"
                                onClick={createBoat}>
                                <span>Create Boat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Boats;
