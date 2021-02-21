import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import UserCard from "../_cards/UserCard";

const Friends = () => {
  const friends = useSelector((state) => state.friends);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="friends-container"
    >
      <h1>Friends</h1>
      {friends ? (
        <>
          {Object.values(friends).map((friend) => (
            <UserCard user={friend} />
          ))}
        </>
      ) : (
        <>
          <span>Friends Loading...</span>
        </>
      )}
    </motion.div>
  );
};

export default Friends;
