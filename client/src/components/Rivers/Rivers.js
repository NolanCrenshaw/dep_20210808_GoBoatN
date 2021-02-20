import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import RiversPagination from "./RiversPagination";

const Rivers = () => {
  const rivers = useSelector((state) => state.rivers);

  const [sortedRivers, setSortedRivers] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  // Listeners
  const updateSearch = (e) => setSearch(e.target.value);

  // Search Function
  const searchRivers = () => {
    const filteredRivers = [];
    const searchTerm = new RegExp(`${search}`, "i");
    for (const river in sortedRivers) {
      if (searchTerm.test(sortedRivers[river].name)) {
        filteredRivers.push(sortedRivers[river]);
      }
    }
    setDisplayed(filteredRivers);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchRivers();
    }
  };

  // Set Init Displayed Rivers
  useEffect(() => {
    const arr = [];
    for (const river in rivers) {
      arr.push(rivers[river]);
    }
    arr.sort((a, b) => a.name > b.name);
    setSortedRivers(arr);
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
