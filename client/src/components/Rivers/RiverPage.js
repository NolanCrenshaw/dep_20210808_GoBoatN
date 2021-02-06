import React, { useEffect } from "react";

const RiverPage = (props) => {
  useEffect(() => {
    // console.log(`River Page's param id: ${props.match.params.id}`);
  }, []);
  return (
    <div className="riverpage-container">
      <h1>RiverPage</h1>
    </div>
  );
};

export default RiverPage;
