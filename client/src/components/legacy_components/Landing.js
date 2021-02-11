// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import ReactModal from "react-modal";

// import { BASE_URL, IMG_KEY } from "../config";

// import BannerModal from "./subComponents/BannerModal";
// import Boats from "./Boats";
// import Vehicles from "./Vehicles";
// import TripCard from "./_cards/TripCard";
// import FriendCard from "./_cards/FriendCard";
// import BannerEditSVG from "../images/BannerEditSVG";

// // import '../styles/landing.css';
// import ProfileModal from "./subComponents/ProfileModal";

// // React Component
// const Landing = () => {
//   // Redux State
//   // const dispatch = useDispatch();
//   const state = useSelector((state) => state.user);

//   // Reference Values
//   const imgFile = React.createRef();
//   const imgFile2 = React.createRef();
//   const token = window.localStorage.getItem("auth_token");
//   const defaultPic = `${IMG_KEY}default-profile-pic.jpg`;

//   // State
//   const [user, setUser] = useState({});
//   // const [userTrips, setUserTrips] = useState([]);
//   // const [userFriends, setUserFriends] = useState([]);
//   // const [userInvites, setUserInvites] = useState([]);
//   const [profilePic, setProfilePic] = useState(defaultPic);

//   // Modal State
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [profileModal, setProfileModal] = useState(
//     "profile-edit__container--hidden"
//   );
//   const [bannerModal, setBannerModal] = useState(
//     "banner-edit__container--hidden"
//   );
//   const customStyles = {
//     content: {
//       width: "50%",
//       height: "50%",
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//       display: "flex",
//       "justify-content": "center",
//       "align-items": "center",
//       "border-radius": "20px",
//       "scrollbar-width": "none",
//     },
//     overlay: { zIndex: 3 },
//   };

//   // Listen

//   // REACT-MODAL
//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     setProfileModal("profile-edit__container--hidden");
//     setBannerModal("banner-edit__container--hidden");
//     setIsOpen(false);
//   };
//   const profileEditOpen = () => {
//     openModal();
//     setProfileModal("profile-edit__container--visible");
//   };
//   const bannerEditOpen = () => {
//     openModal();
//     setBannerModal("banner-edit__container--visible");
//   };

//   // Profile Image Upload Functions
//   // const uploadProfileImg = async () => {
//   //     if (imgFile.current.files[0] !== undefined) {
//   //         const formData = new FormData();
//   //         formData.append('file', imgFile.current.files[0])

//   //         const res = await fetch(`${BASE_URL}/api/bucket/upload`, {
//   //             method: "POST",
//   //             mode: "cors",
//   //             headers: {
//   //                 "Authorization": `Bearer ${token}`,
//   //             },
//   //             body: formData,
//   //         });
//   //         if (!res.ok) {
//   //             // -- TODO -- Handling
//   //             console.log("uploadImg res failure")
//   //         } else {
//   //             const json = await res.json()
//   //             setUser(state.profile.profile_pic = json.sprite)
//   //         }
//   //         const newres = await fetch(`${BASE_URL}/api/users/token/update`, {
//   //             method: "PUT",
//   //             mode: "cors",
//   //             headers: {
//   //                 "Content-Type": "application/json",
//   //                 "Authorization": `Bearer ${token}`,
//   //             },
//   //             body: JSON.stringify(state.profile.profile_pic)
//   //         })
//   //         if (!newres.ok) {
//   //             // -- TODO -- Handling
//   //             console.log("NewRes User update failed");
//   //         } else {
//   //             // -- TODO -- Handling
//   //             const newjson = await newres.json()
//   //             console.log(newjson.message)
//   //         }
//   //     };
//   //     closeModal();
//   // };

//   // Profile Image Render Functions
//   const updateProfilePic = () => {
//     if (state.profile !== undefined && state.profile.profile_pic !== null) {
//       setProfilePic(`${IMG_KEY}${state.profile.profile_pic}`);
//     }
//   };

//   useEffect(() => {
//     updateProfilePic();
//   }, [state]);

//   // ---- Component Render ---- //

//   // Render
//   return (
//     <div className="landing-root--container">
//       <ReactModal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example"
//       >
//         <div className="landing-modal--background">
//           <div className={bannerModal}>
//             <BannerModal closeModal={closeModal} />
//           </div>
//           <div className={profileModal}>
//             <ProfileModal closeModal={closeModal} />
//           </div>
//         </div>
//       </ReactModal>
//       <div className="landing">
//         <div className="landing__picture-box">
//           <div className="landing__profile-pic--container">
//             <div className="landing__profile-pic">
//               <img src={profilePic} />
//               <div
//                 className="landing__profile-edit--button"
//                 onClick={profileEditOpen}
//               >
//                 <BannerEditSVG />
//               </div>
//             </div>
//           </div>
//           <div
//             className="landing__banner-edit--button"
//             onClick={bannerEditOpen}
//           >
//             <BannerEditSVG />
//           </div>
//         </div>
//         <div className="vita">
//           <div className="vita-topbox">
//             <div className="vita-bio--container">
//               <div className="vita-bio__textbox">
//                 <div className="vita-bio__name">
//                   <span>
//                     {state.profile.firstname} {state.profile.lastname}
//                   </span>
//                 </div>
//                 <div className="vita-bio__username">
//                   <span>{state.profile.username}</span>
//                 </div>
//                 <div className="vita-bio__email">
//                   <span>{state.profile.email}</span>
//                 </div>
//               </div>
//               <div className="vita-bio__infobox"></div>
//               <div className="vita-bio__flairbox"></div>
//             </div>
//           </div>
//           <div className="vita-bottombox">
//             <div className="vita-bottombox__cards-c">
//               <div className="vita-card vita-invite--container">
//                 <div className="vita-card__header">
//                   <span>Invites:</span>
//                 </div>
//               </div>
//               <div className="vita-card__divider" />
//               <div className="vita-card vita-trips--container">
//                 <div className="vita-card__header">
//                   <span>Trips:</span>
//                   <div className="vita-trip--container">
//                     {state.trips ? (
//                       state.trips.map((trip) => (
//                         <TripCard trip={trip} key={trip.id} />
//                       ))
//                     ) : (
//                       <div />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="vita-card__divider" />
//               <div className="vita-card vita-friends--container">
//                 <div className="vita-card__header">
//                   <span>Friends:</span>
//                   {state.friends ? (
//                     state.friends.map((friend_id) => (
//                       <FriendCard user={friend_id} key={friend_id} />
//                     ))
//                   ) : (
//                     <div />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="apparatibus">
//           <div className="apparatibus__container">
//             <div className="apparatibus--boats">
//               <Boats user={state.profile} boats={state.boats} />
//             </div>
//             <div className="apparatibus--vehicles">
//               <Vehicles user={state.profile} vehicles={state.vehicles} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;
