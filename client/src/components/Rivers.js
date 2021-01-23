import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import RiverCard from "./cards/RiverCard";
// import '../styles/rivers.css';

// React Component
const Rivers = (props) => {
  const token = window.localStorage.getItem("auth_token");

  // State
  const [rivers, setRivers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchReturn, setSearchReturn] = useState([]);

  // Listen
  const updateSearch = (e) => setSearch(e.target.value);

  // Search Function
  const searchRivers = () => {
    const filterRivers = [];
    const term = new RegExp(`${search}`, "i");
    for (let i = 0; i < rivers.length; i++) {
      const river = rivers[i][0];
      if (term.test(river.name)) {
        filterRivers.push(rivers[i]);
      }
    }
    setSearchReturn(filterRivers);
  };

  useEffect(() => {
    const getRivers = async () => {
      const res = await fetch(`${BASE_URL}/api/rivers/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // -- TODO -- Handling
        console.log("getRivers res failure");
      } else {
        const json = await res.json();
        setRivers(json.rivers);
      }
    };
    getRivers();
    setSearchReturn([...rivers]);
  }, []);

  // ---- Component Render ---- //

  // Render
  return (
    <div className="rivers-root--container">
      <div className="rivers">
        <div className="rivers__search-bar--container">
          <div className="rivers__search-bar">
            <input
              className="rivers__search-bar--input"
              type="text"
              placeholder="Search Rivers"
              value={search}
              onChange={updateSearch}
            />
            <div className="rivers__search-bar--button" onClick={searchRivers}>
              <img src="https://img.icons8.com/cotton/64/000000/search--v2.png" />
            </div>
          </div>
        </div>
        <div className="rivers__cards-container">
          <div className="rivers__cards">
            {searchReturn.length > 0
              ? searchReturn.map((river) => (
                  <RiverCard key={river[0].id} river={river} />
                ))
              : rivers.map((river) => (
                  <RiverCard key={river[0].id} river={river} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rivers;
