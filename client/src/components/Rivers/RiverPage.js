import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config";

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

  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");

    const riverSelector = () => {
      for (let i = 0; i < rivers.length; i++) {
        const river = rivers[i];
        if (`${river.id}` === `${params.id}`) {
          setRiver(river);
        }
      }
    };
    const fetchAccesses = async (tk) => {
      const res = await fetch(`${BASE_URL}/api/rivers/accesses/${params.id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        // -- TODO -- Handling
        console.log("fetchRivers res failure");
      } else {
        const json = await res.json();
        setAccesses(json.accesses);
      }
    };
    if (token !== null) {
      fetchAccesses(token);
    } else {
      // ~~ TODO ~~ Null Token Handling
      console.log("fetchRivers not called / Token is null");
    }

    riverSelector();
  }, [rivers]);

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
      </header>
    </motion.div>
  );
};

export default RiverPage;
