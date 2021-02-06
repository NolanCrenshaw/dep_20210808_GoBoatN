import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import BoatCard from "../_cards/BoatCard";
import VehicleCard from "../_cards/VehicleCard";

const Home = () => {
  const boats = useSelector((state) => state.user.boats);
  const vehicles = useSelector((state) => state.user.vehicles);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="home-container"
    >
      <div className="banner-container">
        <img
          alt="banner image"
          src="https://goboatnbucky.s3.us-east-2.amazonaws.com/eduardlabar_med.jpg"
        />
      </div>
      <div className="user_items">
        <h2>Boats</h2>
        {boats.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-container"
            key={item.id}
          >
            <BoatCard boat={item} />
          </motion.div>
        ))}
      </div>
      <div className="user_items">
        <h2>Vehicles</h2>
        {vehicles.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card-container"
            key={item.id}
          >
            <VehicleCard vehicle={item} />
          </motion.div>
        ))}
      </div>
      <div></div>
    </motion.div>
  );
};

export default Home;
