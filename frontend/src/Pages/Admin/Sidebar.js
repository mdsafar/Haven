import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/dashboard">
        <p>
            Dashboard
        </p>
    </Link>
    <Link to="/dashboard/products">
        <p>
            Products
        </p>
    </Link>
    <Link to="/dashboard/users">
        <p>
          Users
        </p>
      </Link>
      <Link to="/dashboard/orders">
        <p>
          Orders
        </p>
      </Link>
      <Link to="/dashboard/reviews">
        <p>
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;