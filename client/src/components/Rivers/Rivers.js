import React from "react";
import { motion } from "framer-motion";

import RiverCard from "../_cards/RiverCard";

const Rivers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="rivers-container"
    >
      <h1>Rivers Page</h1>
    </motion.div>
  );
};

export default Rivers;
