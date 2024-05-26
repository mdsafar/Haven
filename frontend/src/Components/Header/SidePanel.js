import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SidePanel.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";
import {useAlert} from "react-alert"



const nav_link = [
    {
        path: "/",
        display: "Featured"
    },
    {
        path: "/men",
        display: "Men"
    },
    {
        path: "/women",
        display: "Women"
    },
    {
        path: "/kid",
        display: "Kids"
    }
]

const SidePanel = ({ isOpen, closePanel }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const [isUserOptionsVisible, setUserOptionsVisible] = useState(false);

    const toggleUserOptions = () => {
        setUserOptionsVisible(!isUserOptionsVisible);
    };
  function handleLogout(){
   dispatch(logout())
   alert.success("Successfully Logged Out")
  }

    return (
        <div className={`side-panel ${isOpen ? "open" : ""}`}>
            <button className="close-panel" onClick={closePanel}>
                <i className="ri-close-line"></i>
            </button>
            <ul className="side-menu">
                <li
                    className="user-options-toggle"
                    onClick={toggleUserOptions} 
                >
                    {isAuthenticated && user ? (
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-person"></i>
                            <p>{user.name}</p>
                        </div>
                    ) : (
                        <p>Login</p>
                    )}

                    {!isUserOptionsVisible ? (
                        <i style={{ fontSize: "16px" }} class="bi bi-chevron-down"></i>
                    ) : (
                        <i style={{ fontSize: "16px" }} class="bi bi-chevron-up"></i>
                    )}

                </li>
                    {isUserOptionsVisible && (
                         isAuthenticated ? (
                        <ul className="user-options">
                            <li>
                                <i className="bi bi-person"></i>
                                <NavLink to="/account" onClick={closePanel}>Profile</NavLink>
                            </li>
                            {user && user.role === "admin" && (
                                <li>
                                    <i className="ri-dashboard-line"></i>
                                    <NavLink to="/admin/dashboard" onClick={closePanel}>Dashboard</NavLink>
                                </li>
                            )}
                            <li>
                                <i className="bi bi-bag-check"></i>
                                <NavLink to="/orders" onClick={closePanel}>Orders</NavLink>
                            </li>
                            <li onClick={handleLogout}>
                                <i class="bi bi-box-arrow-right">
                                </i><p onClick={closePanel} >LogOut</p></li>
                        </ul>
                    ) : (
                    <div className="mobileLogin">
                        <NavLink to="/login"><button onClick={closePanel} >Login</button></NavLink>
                    </div>
                )
                )}
                {nav_link.map((items, index) => {
                    return <li key={index} ><NavLink onClick={closePanel} className={(navActive) => navActive.isActive ? "nav_active" : ""} to={items.path}>{items.display}</NavLink></li>
                })}
            </ul>
        </div>
    );
};

export default SidePanel;
