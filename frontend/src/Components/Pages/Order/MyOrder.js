import React, { useEffect } from "react";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { myOrders } from "../../../actions/orderAction";
import Loader from "../../Layout/Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({type:"CLEAR_ERRORS"})
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <div className="myOrdersPage">
      {loading ? (
        <Loader />
      ) : orders.length !== 0 ? (
        <div className="list_items">
          <div className="top_item d-flex justify-content-between">
            <h1>Orders</h1>
          </div>
          <div className="order_list">
            {orders &&
              orders.map((order, index) => (
                <div key={index} className="myorder_container">
                  <div className="myorder_detail">
                    <div>
                      <h3>Order Id : {order._id}</h3>
                      <p>No of items: {order.orderItems.length}</p>
                      <p>Total Amount: ₹ {order.totalPrice}</p>
                      <p>Status: <span style={{color : order.orderStatus === "Delivered" ? "green" : '' }}>{order.orderStatus}</span></p>
                    </div>
                    <div className="viewOrder">
                    <Link to={`/order/${order._id}`} ><button>View Details</button></Link> 
                    </div>
                  </div>
                  <div className="myorder_img_container">
                    {order.orderItems &&
                      order.orderItems.map((orderItem, itemIndex) => (
                        <div key={itemIndex} className="myorder_img">
                          <img src={orderItem.image} alt="" />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
