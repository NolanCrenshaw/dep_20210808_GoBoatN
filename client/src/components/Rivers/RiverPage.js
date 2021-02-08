import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const RiverPage = () => {
  const params = useParams();
  const rivers = useSelector((state) => state.rivers);
  const [river, setRiver] = useState({ name: "undefined" });
  const [accesses, setAccesses] = useState([]);

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
  }, [river]);

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
        <ul>
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
        </ul>
      </header>
    </motion.div>
  );
};

export default RiverPage;
