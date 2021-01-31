import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import LoginForm from "../_forms/LoginForm";
import SignupForm from "../_forms/SignupForm";

const Splash = ({ loginToggle }) => {
  const [toggleUI, setToggleUI] = useState(false);
  const [toggleBtn, setToggleBtn] = useState("Log In");

  useEffect(() => {
    toggleUI ? setToggleBtn("Sign Up") : setToggleBtn("Log In");
  }, [toggleUI]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="splash-container"
    >
      <nav>
        <button className="nav_button" onClick={() => setToggleUI(!toggleUI)}>
          {toggleBtn}
        </button>
      </nav>
      <div className="splash_img">
        <img
          alt="Splash Image"
          src="https://goboatnbucky.s3.us-east-2.amazonaws.com/joshwedgwood_river_etive_medium.jpg"
        />
      </div>
      <div className="splash_panel">
        {toggleUI ? (
          <LoginForm loginToggle={loginToggle} />
        ) : (
          <SignupForm loginToggle={loginToggle} />
        )}
      </div>
      <footer>
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@j_wedge?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Josh Wedgwood
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/collections/49830411/goboating/91051db916769619b8921c9a03751d76?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@edo_labar_foto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Eduard Labár
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/collections/49830411/goboating/91051db916769619b8921c9a03751d76?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
        <span>
          nav icons by
          <a href="https://tablericons.com/">Tabler Icons</a>
        </span>
      </footer>
    </motion.div>
  );
};

export default Splash;
