import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import RiverCard from "../_cards/RiverCard";

const Rivers = () => {
  const rivers = useSelector((state) => state.rivers);

  const [riversDisplayed, setRiversDisplayed] = useState([]);

  // Set Init Displayed Rivers ~~ Limit 20
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < rivers.length && i < 20; i++) {
      arr.push(rivers[i]);
    }
    setRiversDisplayed(arr);
  }, [rivers]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="rivers-container"
    >
      <h1>Rivers Page</h1>
      {riversDisplayed[0] !== undefined ? (
        riversDisplayed.map((river) => <RiverCard river={river} />)
      ) : (
        <div>
          <p>No Rivers</p>
        </div>
      )}
    </motion.div>
  );
};

export default Rivers;
