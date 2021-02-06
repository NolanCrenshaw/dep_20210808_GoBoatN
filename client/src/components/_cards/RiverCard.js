import React from "react";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";

const RiverCard = ({ river }) => {
  const history = useHistory();

  return (
    <Link to={`/rivers/${river[0].id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rivercard-container card"
      >
        <div>
          <span>{river[0].name}</span>
        </div>
        <div className="riverCard__info--class">
          <span>{river[0].region}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default RiverCard;
