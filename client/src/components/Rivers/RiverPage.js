import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config";

import CreateTripForm from "../_forms/CreateTripForm";

const RiverPage = () => {
  const params = useParams();
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
    const fetchAccesses = async (tk, id) => {
      const res = await fetch(`${BASE_URL}/api/rivers/accesses/${id}/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        // ~~ TODO ~~ Handling
      } else {
        const json = await res.json();
        setAccesses(json.accesses);
      }
    };
    fetchAccesses(token, params.id);
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
