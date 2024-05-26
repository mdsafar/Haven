import React, { useEffect } from "react";
import Sidebar from "../Sidebar.js";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../actions/productAction.js";
import { getAllUsers } from "../../../actions/userAction.js";
import { getAllOrders } from "../../../actions/orderAction.js";

const Dashboard = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.allUsers)
    const { products } = useSelector((state) => state.products)
    const { orders } = useSelector((state) => state.allOrders)

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(getAllUsers())
        dispatch(getAllOrders())
    }, [dispatch])
    return (
        <div className="dashboard">
            <Sidebar />

            <div className="dashboardContainer">
                <h1 component="h1">Dashboard</h1>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount :<span> ₹ {totalAmount}</span>
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Products</p>
                            <h1>{products?.length}</h1>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <h1>{orders ? orders.length : 0}</h1>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <h1>{users?.length}</h1>
                        </Link>
                    </div>
                </div>
                <div className="outOfStock sec">
                    <h1 >Out Of Stock</h1>
            {products &&
                products.map((item) => (
             <div className="StockCartItemsContainer">
                  <div key={item.product}>
                    <img src={item.images[0].url} alt="Product" />
                    <div className="StockCartItemsDetails"  >
                    <Link to={`/product/${item._id}`}>{item.name}</Link>{" "}
                    <p>{item.category}</p>
                    </div>
                    {item.Stock > 0 ? (
                    <span >
                    Stocks: <b>{item.Stock}</b>
                    </span>  
                    ):(
                        <span style={{color:"darkred",fontWeight:"600"}}>
                            Out Of Stock
                        </span>
                    )}
                   
                  </div>
            </div>
            ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

