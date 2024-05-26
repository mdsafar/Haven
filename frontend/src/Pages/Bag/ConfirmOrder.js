import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import { getBagItem, removeItemsFromBag } from "../../actions/bagAction";

const ConfirmOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingInfo, bagItems } = useSelector((state) => state.bag);
  const { user } = useSelector((state) => state.user);

  const id = user?._id

  useEffect(()=>{
    dispatch(getBagItem(id))
  },[dispatch,id])

  const subtotal = bagItems.reduce((acc, item) => {
    return  acc + (item.quantity || 1) * item.price;
  },0)
    
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const order = {
    shippingInfo,
    orderItems: bagItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const orderSubmit = () => {
     dispatch(createOrder(order))
     bagItems.map((item)=>{
      return dispatch(removeItemsFromBag(item.product))
     })
      navigate('/success')
  };

  return <>
        <div className="confirmMainContainer">
      <div className="confirmOrderPage">
      <div className="confirmContainer">
        <div className="confirm-cart-container">
          <div className="confirmshippingArea">
            <p>Shipping Info:</p>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <p>Your Cart Items:</p>
            {bagItems &&
                bagItems.map((item) => (
            <div className="confirmCartItemsContainer">
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <div className="confirmCartItemsDetails" >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                    <p>{item.category}</p>
                    </div>
                    <span>
                      {(item.quantity || 1)} X {item.price} = <b>₹ {item.price * (item.quantity || 1)}.00</b>
                    </span>
                  </div>
            </div>
            ))}
          </div>
        </div>
        {/*  */}
        <div className="orderSummaryContainer">
          <div className="orderSummary">
            <p>Order Summary</p>
            <div >
              <div>
                <p>Subtotal:</p>
                <span>₹ {subtotal}.00</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges === 0 ? "Free" : `₹${shippingCharges}.00`}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹ {Math.floor(tax)}.00</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹ {totalPrice}.00</span>
            </div>

            <button onClick={orderSubmit}>Confirm Order</button>
          </div>
        </div>
        </div>
      </div>
      </div>
      </>
};

export default ConfirmOrder;