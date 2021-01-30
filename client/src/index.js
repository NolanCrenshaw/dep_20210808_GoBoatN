import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import TagManager from "react-gtm-module";

import "./index.css";
import App from "./App";
import configureStore from "./store";

// ~~ Google Tag Manager Init
const tagManagerArgs = {
  gtmId: "GTM-WBC6XGV",
};
TagManager.initialize(tagManagerArgs);

// ~~ Core Render ~~
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById("root")
);
