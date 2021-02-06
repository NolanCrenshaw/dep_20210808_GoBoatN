import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RiverPage = () => {
  const params = useParams();

  /*
  ~~ TODO ~~
  RIVER DATABASE OBJECT MUST BE REBUILT
  CURRENTLY EACH RIVER OBJECT IS NESTED ARRAY
  UNABLE TO ACCESS BY ID
  */
  // const river = useSelector((state) => state.rivers[params.id]);

  return (
    <div className="riverpage-container">
      <h1>{`River ${params.id}`}</h1>
    </div>
  );
};

export default RiverPage;
