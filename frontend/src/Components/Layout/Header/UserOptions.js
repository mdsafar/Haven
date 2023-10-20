import {NavLink } from "react-router-dom";
import React,{ useState} from "react";
import {useSelector,useDispatch} from "react-redux"
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";


const UserOptions = () => {
  
    const dispatch = useDispatch()
    const {user,isAuthenticated} = useSelector((state)=>state.user)
    const alert = useAlert()


    const LogoLetter = isAuthenticated && user ? user.name.split(' ').map(word => word.charAt(0))[0].toUpperCase() : null

    const [isUserOptionVisible, setUserOptionVisible] = useState(false)

    const toggleUserOption = () => {
        setUserOptionVisible(!isUserOptionVisible)
    }
    const handleLogout = () => {
         dispatch(logout())
         alert.success("Successfully Logged Out")
      }
    return <>
        <div className="user_icon" onMouseEnter={toggleUserOption} onMouseLeave={toggleUserOption} >
            <h1 >{LogoLetter}</h1>
            <div className={`acc_options ${isUserOptionVisible ? 'visible' : ''}`}>
                <ul>
                    <li className={isUserOptionVisible ? 'animate-in' : ''}>
                        <i class="bi bi-person"></i>
                        <NavLink to="/account">Profile</NavLink>
                    </li>
                    {user.role === "admin" ?
                        (<li className={isUserOptionVisible ? 'animate-in' : ''} >
                            <i class="ri-dashboard-line"></i>
                           <NavLink to="/admin/dashboard">Dashbrd</NavLink> 
                            </li>
                        ) : null}
                    <li className={isUserOptionVisible ? 'animate-in' : ''}>
                        <i class="bi bi-bag-check"></i>
                        <NavLink to="/orders">Orders</NavLink>
                    </li>
                    <li className={isUserOptionVisible ? 'animate-in' : ''} onClick={handleLogout}>
                        <i class="bi bi-box-arrow-right">
                        </i>LogOut</li>
                </ul>
            </div>
        </div>
    </>
}

export default UserOptions