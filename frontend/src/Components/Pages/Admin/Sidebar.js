import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/admin/dashboard">
        <p>
            Dashboard
        </p>
    </Link>
    <Link to="/admin/products">
        <p>
            Products
        </p>
    </Link>
    <Link to="/admin/users">
        <p>
          Users
        </p>
      </Link>
      <Link to="/admin/orders">
        <p>
          Orders
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;