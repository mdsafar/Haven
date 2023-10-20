import React, { useEffect } from "react";
import "./ProductList.css";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getAllUsers } from "../../../actions/userAction";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";




const UserList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { users, loading,error } = useSelector((state) => state.allUsers)
    const {isDeleted,message,error:deleteError} = useSelector((state)=> state.profile)

    const LogoLetter = users ? users.map((user) => user.name.split(' ').map(word => word.charAt(0))[0].toUpperCase()) : null;


    function handleDelete(id){
         dispatch(deleteUser(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({type:"CLEAR_ERRORS"})
          }
      
          if (deleteError) {
            alert.error(deleteError);
            dispatch({type:"CLEAR_ERRORS"})
          }
      
        if(isDeleted){
         alert.success(message)
            navigate("/admin/users")
            dispatch({type:"DELETE_USER_RESET"})
        }
        
        dispatch(getAllUsers())
    }, [dispatch,alert,isDeleted,error,deleteError,navigate,message])

    return <>
        {loading ? (
            <Loader />
        ) : (
            <div className="dashboard">
                <Sidebar />
                <div className="list_items">
                    <div className=" top_item">
                        <h1>User List</h1>
                    </div>
                    <ul className="product_list" >
                        {users.map((user, index) => (
                            <li key={index} className="product">
                                <div className="user_letter">
                                   <h1>{LogoLetter[index]}</h1>
                                </div>
                                <div className="product_detail" style={{ width: "84%" }}>
                                    <h3>{user.name}</h3>
                                    <p>User Id: {user._id}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                                <button onClick={()=>handleDelete(user._id)} className="delete_btn"><i class="bi bi-trash3"></i>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
        }
    </>
};

export default UserList;