import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RiverCard = ({ river }) => {
  return (
    <Link to={`/rivers/${river.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rivercard-container card"
      >
        <div>
          <span>{river.name}</span>
        </div>
        <div className="riverCard__info--class">
          <span>{river.region}</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default RiverCard;
