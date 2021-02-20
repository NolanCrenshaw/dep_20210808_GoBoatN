import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { fetchAccesses } from "../../actions/riverActions";

import CreateTripForm from "../_forms/CreateTripForm";

const RiverPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const river = useSelector((state) => state.rivers[`${params.id}`]);
  const [accesses, setAccesses] = useState();

  // Form Toggle
  const [createFormClass, setCreateFormClass] = useState("hidden");
  const toggleCreateForm = () => {
    createFormClass === "hidden"
      ? setCreateFormClass("shown")
      : setCreateFormClass("hidden");
  };

  // Map State
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState(11);

  // Set Accesses into State from River Obj
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    // dispatch(fetchAccesses(token, params.id));
    // setAccesses(river.accesses);
    // console.log("HELLO", accesses);
  }, []);

  /*
  ~~ Creates center point for Map
  Map does not set without accesses being loaded
  ~~ Future TODO ~~
  Added default center value to River Objects
  */
  useEffect(() => {
    if (accesses !== undefined && accesses.length !== 0) {
      const access = accesses[0];
      const center = [access.latitude, access.longitude];
      setCenter(center);
    }
  }, [accesses]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="riverpage-container"
    >
      <header>
        <div>
          {river ? (
            <>
              <h1>{river.name}</h1>
              <h4>{river.region}</h4>
            </>
          ) : (
            <>
              <h1>loading Name</h1>
              <h4>loading Region</h4>
            </>
          )}
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleCreateForm()}
          >
            + Create Trip
          </motion.button>
        </div>
      </header>
      <section className={createFormClass}>
        <CreateTripForm river={river} accesses={accesses} />
      </section>
      <div className="map-container">
        <Map center={center} zoom={zoom} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {accesses ? (
            accesses.map((access, i) => (
              <Marker key={i} position={[access.latitude, access.longitude]}>
                <Popup>{access.name}</Popup>
              </Marker>
            ))
          ) : (
            <div>undefined</div>
          )}
        </Map>
      </div>
    </motion.div>
  );
};

export default RiverPage;
