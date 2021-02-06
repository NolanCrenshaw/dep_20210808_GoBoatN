import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import RiversPages from "./RiversPages";

const Rivers = () => {
  const rivers = useSelector((state) => state.rivers);

  const [riversDisplayed, setRiversDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  // Listeners
  const updateSearch = (e) => setSearch(e.target.value);

  // Search Function
  const searchRivers = () => {
    const filterRivers = [];
    const searchTerm = new RegExp(`${search}`, "i");
    for (let i = 0; i < rivers.length; i++) {
      const river = rivers[i][0];
      if (searchTerm.test(river.name)) {
        filterRivers.push(rivers[i]);
      }
    }
    setRiversDisplayed(filterRivers);
  };

  // Set Init Displayed Rivers ~~ Limit 20
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < rivers.length; i++) {
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
      <div>
        <input
          className="search_input"
          type="text"
          placeholder="Search Rivers"
          value={search}
          onChange={updateSearch}
        />
        <div className="search_button" onClick={searchRivers}>
          <img src="https://img.icons8.com/cotton/64/000000/search--v2.png" />
        </div>
      </div>
      <RiversPages rivers={riversDisplayed} />
    </motion.div>
  );
};

export default Rivers;
