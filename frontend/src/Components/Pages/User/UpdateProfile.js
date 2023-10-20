import React, { useEffect, useState } from "react";
import "./UpdateProfile.css"
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";



const UpdateProfile = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.user)
  const { isUpdated,error,loading } = useSelector((state) => state.profile)



  const [userData, setUserData] = useState({
    name: "",
    email: ""
  })

  function handleChange(e) {
    const { name, value } = e.target
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  function updateProfileSubmit(e) {
    e.preventDefault()
    dispatch(updateProfile(userData))
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    if(error){
      alert.error(error)
      dispatch({type:"CLEAR_ERRORS"});
    }
    if (isUpdated) {
      dispatch(loadUser());
       navigate("/account")
      alert.success("Successfully Updated ")
      dispatch({ type: "UPDATE_PROFILE_RESET" })
      setUserData({
        email:"",
        name:""
      })
    }
  }, [dispatch,isUpdated, user, alert,error,navigate]);


  return <>
  {loading ? (
    <Loader/>
  ):(
    <div className="updateProfileContainer">
      <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>

        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={updateProfileSubmit}
        >
          <div className="updateProfileName">
            <i class="bi bi-person"></i>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="updateProfileEmail">
            <i class="bi bi-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <input
            type="submit"
            value="Update"
            className="updateProfileBtn"
          />
        </form>
      </div>
    </div>
    )}
  </>
}

export default UpdateProfile;