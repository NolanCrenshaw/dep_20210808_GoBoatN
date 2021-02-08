import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { motion } from "framer-motion";

const RiverPage = () => {
  const params = useParams();
  const rivers = useSelector((state) => state.rivers);
  const [river, setRiver] = useState({ name: "undefined" });
  const [accesses, setAccesses] = useState([]);

  // Map State
  const [putin, setPutin] = useState([35.0829, -84.4918]);
  const [takeout, setTakeout] = useState([35.0829, -84.4918]);
  const [center, setCenter] = useState([35.0829, -84.4918]);
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
    if (river) {
      setAccesses(river.accesses);
    }
    // console.log("HELLO", accesses);
  }, [river]);

  useEffect(() => {
    if (accesses !== undefined && accesses.length !== 0) {
      console.log("HELLO", accesses);
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
        <h1>{river.name}</h1>
        <h4>{river.region}</h4>
        {/* <ul>
          {accesses ? (
            accesses.map((access) => (
              <li>
                <h4>{access.name}</h4>
                <p>{access.id}</p>
                <p>{access.latitude}</p>
                <p>{access.longitude}</p>
              </li>
            ))
          ) : (
            <div>undefined</div>
          )}
        </ul> */}
      </header>
      <div className="map-container">
        <Map center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {accesses ? (
            accesses.map((access) => (
              <Marker position={[access.latitude, access.longitude]} />
              // <h4>{access.name}</h4>
              // <p>{access.id}</p>
              // <p>{access.latitude}</p>
              // <p>{access.longitude}</p>
            ))
          ) : (
            <div>undefined</div>
          )}

          <Marker position={putin}>
            {/* <Popup>{access[0].name}</Popup> */}
          </Marker>
          <Marker position={takeout}>
            {/* <Popup>{access[1].name}</Popup> */}
          </Marker>
        </Map>
      </div>
    </motion.div>
  );
};

export default RiverPage;
