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
  const rivers = useSelector((state) => state.rivers);
  const [river, setRiver] = useState({});
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

  /*
  ~~ TODO ~~
  Refine State request with Param
  Learn to select single piece of State
  */
  // Return River from State by `params.id`
  useEffect(() => {
    const riverSelector = () => {
      for (let i = 0; i < rivers.length; i++) {
        const river = rivers[i];
        if (`${river.id}` === `${params.id}`) {
          setRiver(river);
        }
      }
    };
    riverSelector();
  }, [rivers]);

  // Set Accesses into State from River Obj
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    // dispatch(fetchAccesses(token, params.id));
    // setAccesses(river.accesses);
    // console.log("HELLO", accesses);
  }, []);

  useEffect(() => {
    if (accesses !== undefined && accesses.length !== 0) {
      // console.log("HELLO", accesses);
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
          <h1>{river.name}</h1>
          <h4>{river.region}</h4>
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
