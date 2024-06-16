import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { IoStorefrontOutline, IoPersonOutline } from "react-icons/io5";
import { Menu, MenuItem } from '@mui/material'
import { RiDashboardLine } from "react-icons/ri";
import { BsBagCheck } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { randomColor } from 'randomcolor'


const UserOptions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const alert = useAlert()


    const LogoLetter = isAuthenticated && user ? user.name.split(' ').map(word => word.charAt(0))[0].toUpperCase() : null

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout())
        alert.success("Successfully Logged Out")
    }

    const menuItems = [
        {
            name: "Profile",
            icon: <IoPersonOutline size={18} />,
            link: "/account"
        },
        {
            name: "My Store",
            icon: <IoStorefrontOutline size={18} />,
            link: "/my-store"
        },
        {
            name: "Dashboard",
            icon: <RiDashboardLine size={18} />,
            link: "/dashboard"
        },
        {
            name: "Orders",
            icon: <BsBagCheck size={18} />,
            link: "/orders"
        },
    ]


    return <>
        <div className="user_icon" onClick={handleClick} style={{ backgroundColor: randomColor() }}>
            <h1>{LogoLetter}</h1>
        </div>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            className="no-underline px-10 mt-2 shadow-none"
        >
            {menuItems.map((item, index) => (
                item.name === 'Dashboard' && user?.role !== 'admin' ? null :
                    <MenuItem key={index} onClick={() => { handleClose(); navigate(item.link) }} className="!px-5">
                        <div className="flex items-center text-black">
                            {item.icon}
                            <p className="mb-0 ms-2">{item.name}</p>
                        </div>
                    </MenuItem>
            ))}
            <MenuItem onClick={handleClose} className="!px-5  hover:!bg-orange-300 hover:!text-white">
                <div onClick={handleLogout} className="flex items-center hover:!text-white">
                    <IoIosLogOut size={18} />
                    <p className="mb-0 ms-2">Logout</p>
                </div>
            </MenuItem>
        </Menu>
    </>
}

export default UserOptions