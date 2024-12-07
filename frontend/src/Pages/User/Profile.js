import React from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { randomColor } from "randomcolor";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();
  const LogoLetter = isAuthenticated
    ? user.name
        .split(" ")
        .map((word) => word.charAt(0))[0]
        .toUpperCase()
    : null;

  const handleLogout = () => {
    dispatch(logout());
    alert.success("Successfully Logged Out");
  };

  return (
      <div className="sec">
        <div className="main_container">
          <div className="scnd_container  ">
            <div className="logo_container d-flex justify-content-center ">
              <div
                className="user_logo d-flex align-items-center justify-content-center bg-slate-500"
                style={{ backgroundColor: randomColor() }}
              >
                <h1>{LogoLetter}</h1>
              </div>
            </div>
            <div className="details_container d-flex align-items-center justify-content-center">
              <div className="user_details">
                <div className="user_name d-flex align-items-baseline ">
                  <h2>Name :</h2> <h3>{user.name}</h3>
                </div>
                <div className="user_email d-flex align-items-baseline">
                  <h2>Email :</h2> <h3>{user.email}</h3>
                </div>
                <div className="buttons">
                  <button className="frst_btn">
                    <Link to="/me/update">Update Profile</Link>
                  </button>
                  <button onClick={handleLogout} className="scnd_btn">
                    <Link to="/">LogOut</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Profile;
