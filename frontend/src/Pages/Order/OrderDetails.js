import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../../Components/Loader/Loader"
import { getOrderDetails } from "../../actions/orderAction";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams()

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({type:"CLEAR_ERRORS"})
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);

  return <>
    {loading ? (
      <Loader/>
    ) : (
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <h1>Order #{order && order._id}</h1>
          <p>Shipping Info :</p>
          <div className="orderDetailsContainerBox">
            <div className="d-flex">
              <p>Name:</p>
              <span>{order.user && order.user.name}</span>
            </div>
            <div className="d-flex">
              <p>Phone:</p>
              <span>
                {order.shippingInfo && order.shippingInfo.phoneNo}
              </span>
            </div>
            <div className="d-flex">
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
            <div className="d-flex">
              <p>Amount:</p>
              <span> ₹ {order.totalPrice && order.totalPrice}</span>
            </div>
          </div>
          <p>Order Status :</p>
          <div className="orderStatusContainerBox">
              <p
                className={
                  order.orderStatus && order.orderStatus === "Delivered"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order.orderStatus && order.orderStatus}
              </p>
          </div>
        </div>
        <div className="orderDetailsCartItems">
          <p>Order Items:</p>
          {order.orderItems &&
            order.orderItems.map((item) => (
              <div className="orderDetailsCartItemsContainer">
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <div className="orderDetailsCartItemsDetails" >
                    <Link to={`/product/${item.product}`} >{item.name}</Link>{" "}
                  </div>
                  <span >
                    {(item.quantity || 1)} X {item.price} = <b>₹ {item.price * (item.quantity || 1)}.00</b>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    )}
  </>
};

export default OrderDetails;
