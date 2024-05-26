import React, { useEffect } from "react";
import "./OrderList.css";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../Components/Loader/Loader";
import { deleteOrder, getAllOrders } from "../../../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";




const OrderList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { orders, loading } = useSelector((state) => state.allOrders)
  const { error, isDeleted } = useSelector((state) => state.order);

function handleDelete (id){
   dispatch(deleteOrder(id))
}

useEffect(() => {
  if (error) {
    alert.error(error);
  }
  if (isDeleted) {
    alert.success("Order Deleted Successfully");
     navigate('/admin/orders')
    dispatch({ type: "DELETE_ORDER_RESET" });
  }

  dispatch(getAllOrders());
}, [dispatch, alert,navigate, error,isDeleted]);


  return <>
    {loading ? (
      <Loader />
    ) : (
      <div className="dashboard">
        <Sidebar />
        <div className="list_items">
          <div className=" top_item d-flex justify-content-between">
            <h1>Orders List</h1>
          </div>
          <div className="order_list">
            {orders &&
              orders.map((order, index) => (
                <div key={index} className="order_container">
                  <div className="order_detail">
                  <div>
                    <h3>Order Id : {order._id}</h3>
                    <p>No of items: {order.orderItems.length}</p>
                    <p>Total Amount: ₹ {order.totalPrice}</p>
                    <p>Status: <span style={{color : order.orderStatus === "Delivered" ? "green" : '' }} >{order.orderStatus}</span></p>
                    </div>
                    <div className="order-list-btn d-flex gap-2">
                    <Link to={`/admin/order/${order._id}`}><button className="edit_btn"><i class="bi bi-pencil"></i>Edit</button></Link>
                    <button onClick={()=> handleDelete(order._id)} className="delete_btn"><i class="bi bi-trash3"></i> Delete</button>
                    </div>
                    </div>
                  <div className="order_img_container">
                    {order.orderItems &&
                      order.orderItems.map((orderItem) => {
                      return  <div className="order_img">
                         <img src={orderItem.image} alt="" />
                        </div>
                      })}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
    }
  </>
};

export default OrderList;