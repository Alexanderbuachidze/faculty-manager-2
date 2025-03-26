import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Global styles
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from 'bootstrap'
import "../src/scss/styles.scss"
// import "../src/styles/scss/_bootstrap.scss"
import "../src/styles/theme.css"
// import '../src/styles/scss/theme/_modal.scss';  




ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
