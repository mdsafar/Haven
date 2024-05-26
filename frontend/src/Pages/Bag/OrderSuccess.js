import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="orderSuccess">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
            </svg>
            <p>Your Order has been Placed successfully, <span>INI KADEL POI VANGICHOO :)</span></p>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;