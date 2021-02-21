import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import UserCard from "../_cards/UserCard";
import FriendsPagination from "./FriendsPagination";

const Friends = () => {
  const friends = useSelector((state) => state.friends);

  const [sortedFriends, setSortedFriends] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  const updateSearch = (e) => setSearch(e.target.value);

  // Search Function
  const searchFriends = () => {
    const filteredFriends = [];
    const searchTerm = new RegExp(`${search}`, "i");
    for (const friend in sortedFriends) {
      if (searchTerm.test(sortedFriends[friend].lastname)) {
        filteredFriends.push(sortedFriends[friend]);
      }
    }
    setDisplayed(filteredFriends);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFriends();
    }
  };

  // Set Init Displayed Friends
  useEffect(() => {
    const arr = [];
    Object.values(friends).map((friend) => {
      if (friend !== false) {
        arr.push(friend);
      }
    });
    arr.sort((a, b) => a.lastname > b.lastname);
    setSortedFriends(arr);
    setDisplayed(arr);
  }, [friends]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 1.1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
      className="friends-container"
    >
      <header>
        <h1>Friends</h1>
        <div>
          <input
            className="search_input"
            type="text"
            placeholder="Search Friends"
            value={search}
            onChange={updateSearch}
            onKeyDown={handleKeyDown}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="search_button"
            onClick={searchFriends}
          >
            <img src="https://img.icons8.com/cotton/64/000000/search--v2.png" />
          </motion.div>
        </div>
      </header>
      <FriendsPagination friends={displayed} />
    </motion.div>
  );
};

export default Friends;
