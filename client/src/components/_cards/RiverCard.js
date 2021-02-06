import React from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const RiverCard = ({ river }) => {
  const history = useHistory();

  const navToRiver = () => {
    history.push(`/rivers/${river[0].id}`);
    history.go(0);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rivercard-container card"
      onClick={navToRiver}
    >
      <div>
        <span>{river[0].name}</span>
      </div>
      <div className="riverCard__info--class">
        <span>{river[0].region}</span>
      </div>
    </motion.div>
  );
};

export default RiverCard;
