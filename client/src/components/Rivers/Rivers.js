import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import RiversPagination from "./RiversPagination";

const Rivers = () => {
  const rivers = useSelector((state) => state.rivers);

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  // Listeners
  const updateSearch = (e) => setSearch(e.target.value);

  // Search Function
  const searchRivers = () => {
    const filterRivers = [];
    const searchTerm = new RegExp(`${search}`, "i");
    for (let i = 0; i < rivers.length; i++) {
      const river = rivers[i];
      if (searchTerm.test(river.name)) {
        filterRivers.push(rivers[i]);
      }
    }
    setDisplayed(filterRivers);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchRivers();
    }
  };

  // Set Init Displayed Rivers ~~ Limit 20
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < rivers.length; i++) {
      arr.push(rivers[i]);
    }
    setDisplayed(arr);
  }, [rivers]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="rivers-container"
    >
      <header>
        <h1>Rivers</h1>
        <div>
          <input
            className="search_input"
            type="text"
            placeholder="Search Rivers"
            value={search}
            onChange={updateSearch}
            onKeyDown={handleKeyDown}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="search_button"
            onClick={searchRivers}
          >
            <img src="https://img.icons8.com/cotton/64/000000/search--v2.png" />
          </motion.div>
        </div>
      </header>
      <RiversPagination rivers={displayed} />
    </motion.div>
  );
};

export default Rivers;
