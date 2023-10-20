import React from "react";
import "./NotFound.css"; // You can create your own CSS file for styling.
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <div className="ErrorIcon">404</div>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;

