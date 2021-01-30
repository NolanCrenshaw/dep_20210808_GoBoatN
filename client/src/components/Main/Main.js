import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const user = useSelector((state) => state.user.profile);
  const boats = useSelector((state) => state.user.boats);

  return (
    <div className="main-container">
      <h1>Hello World</h1>
      <h2>Main</h2>
      <h3>{user.username}</h3>
      <div>
        {boats.map((item, i) => (
          <div key={i}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;
