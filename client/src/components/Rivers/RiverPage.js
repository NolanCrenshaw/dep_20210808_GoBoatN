import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RiverPage = () => {
  const params = useParams();
  const rivers = useSelector((state) => state.rivers);
  const [river, setRiver] = useState({ name: "undefined" });

  /*
  ~~ TODO ~~
  Refine State request with Param
  Learn to select single piece of State
  */

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

  return (
    <div className="riverpage-container">
      <h1>{`River ${params.id}`}</h1>
      <h3>Hello</h3>
      <h3>{river.name}</h3>
      <h3>World</h3>
    </div>
  );
};

export default RiverPage;
