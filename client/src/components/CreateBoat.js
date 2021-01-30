// import React, { useState } from "react";
// import { BASE_URL, IMG_KEY } from "../config";
// // import '../styles/createboat.css';

// const CreateBoat = (props) => {
//   const token = window.localStorage.getItem("auth_token");
//   const boatSprites = [
//     { title: "yellow_canoe", sprite: "canoeSprite.png" },
//     { title: "red_playboat", sprite: "playBoatSprite.png" },
//     { title: "orange_raft", sprite: "raftSprite.png" },
//     { title: "blue_raft", sprite: "blue_raft.webp" },
//     { title: "orange_canoe", sprite: "orange_canoe.png" },
//     { title: "orange_playboat", sprite: "orange_playboat.png" },
//     { title: "purple_longboat", sprite: "purple_longboat.png" },
//     { title: "red_canoe", sprite: "red_canoe.png" },
//     { title: "yellow_sea_kayak", sprite: "yellow_sea_kayak.png" },
//   ];

//   // State
//   const [spriteOption, setSpriteOption] = useState(boatSprites[0].sprite);

//   // Listen
//   const updateSpriteOption = (e) => setSpriteOption(e.target.value);

//   // Create a Boat Function
//   const createBoat = async () => {
//     const boat = {
//       name: props.name,
//       make: props.make,
//       user_id: props.user.id,
//       occupancy: props.occupancy,
//       sprite: spriteOption,
//     };
//     const res = await fetch(`${BASE_URL}/api/boats/`, {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(boat),
//     });
//     if (!res.ok) {
//       // -- TODO -- Handling
//       console.log("createBoat res failure");
//     } else {
//       window.location.reload();
//     }
//   };

//   // ---- Component Render ---- //

//   // Render
//   return (
//     <div className="boat-modal--container">
//       <div className="create-boat__img--container">
//         <span className="create-boat__img--instruct">
//           Select an image for your boat
//         </span>
//         <div className="create-boat__img-form">
//           {boatSprites.map((boat) => (
//             <div className="boat-sprite--container">
//               <div className="boat-sprite__img">
//                 <img src={`${IMG_KEY}${boat.sprite}`} />
//               </div>
//               <input
//                 type="radio"
//                 onClick={updateSpriteOption}
//                 value={boat.sprite}
//                 checked={spriteOption === boat.sprite}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="create-boat__button" onClick={createBoat}>
//           <span>Submit</span>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CreateBoat;
