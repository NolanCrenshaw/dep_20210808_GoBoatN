import React from "react";
import { useHistory } from "react-router-dom";

const RiverCard = ({ river }) => {
  const history = useHistory();

  const navToRiver = () => {
    history.push(`/rivers/${river[0].id}`);
    history.go(0);
  };

  return (
    <div className="rivercard-container card" onClick={navToRiver}>
      <div>
        <span>{river[0].name}</span>
      </div>
      <div className="riverCard__info--class">
        <span>{river[0].region}</span>
      </div>
    </div>
  );
};

export default RiverCard;
