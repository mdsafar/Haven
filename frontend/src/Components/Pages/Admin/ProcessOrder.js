import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./ProcessOrder.css";
import { getOrderDetails, updateOrder } from "../../../actions/orderAction";
import Loader from "../../Layout/Loader/Loader";

const ProcessOrder = () => {
    const { id } = useParams()
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({type:"CLEAR_ERRORS"})
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({type:"CLEAR_ERRORS"})
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            dispatch({ type: "UPDATE_ORDER_RESET" });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <div>
            <div className="dashboard">
                <SideBar />
                <div className="processContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="processOrderPage"
                        >
                            <div className="processDetailsContainer">
                                <div className="processShippingInfo">
                                    <h2>Shipping Info :</h2>
                                    <div className="processOrderContainer">
                                        <div className="d-flex gap-2">
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <p>Amount:</p>
                                            <span> ₹ {order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>
                                    <h2>Order Status :</h2>
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
                                <div className="processCartItems">
                                    <p>Cart Items:</p>
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div className="processCartItemsContainer">
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <div className="processCartItemsDetails" >
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
                            <div
                                style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                                className="updateProcessContainer"
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h2>Process Order</h2>
                                    <div>
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}
                                            {order.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>
                                    <button
                                        id="updateProcessBtn"
                                        type="submit"
                                        disabled={
                                            loading || status === ""
                                        }
                                    >
                                        Process
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProcessOrder;