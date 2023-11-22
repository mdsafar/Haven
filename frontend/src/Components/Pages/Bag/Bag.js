import React, { useEffect } from "react";
import "./Bag.css";
import BagItemCard from "./BagItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBagItem } from "../../../actions/bagAction";



const Bag = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { bagItems,isUpdated } = useSelector((state) => state.bag)
    const {user} = useSelector((state)=> state.user)

    const id = user?._id;

    const isAnyQuantityExceedingStock = bagItems?.some(
        (item) => item.quantity > item.stock
      );

    
    useEffect(()=>{
        dispatch(getBagItem(id)) 
        if (isUpdated) {
            dispatch({ type: "UPDATE_BAG_ITEM", payload: false }); 
            dispatch(getBagItem(id)); 
          }
     },[dispatch,id,isUpdated])

    function checkoutHandler() {
        navigate('/shipping')
    }

    return <>
        <div className="bag-main-container">
            <div className="bagPage">
                <div className="bag-container">
                    <div className="bag-product-container">
                        <h1>Bag</h1>
                        {bagItems &&
                            bagItems.length === 0 ? (
                            <p style={{ margin: "20px" }}>There are no items in your bag.</p>
                        ) : (
                          bagItems &&  bagItems.map((item, index) => {
                                return <BagItemCard item={item} key={index} />
                            })
                        )
                        }

                    </div>
                    <div className="bag-price-container">
                        <div className="bag-price-details">
                            <h1>Summary</h1>
                            <div className=" bag-total-amount d-flex justify-content-between">
                                <h5>Total Amount</h5>
                                <p>
                                    {bagItems && bagItems.length === 0
                                        ? '--'
                                        : bagItems &&`₹ ${bagItems.reduce((acc, item) => {
                                            return acc + (item.quantity || 1) * item.price;
                                        }, 0).toFixed(2)}`}
                                </p>
                            </div>
                            {bagItems &&
                            bagItems.length !== 0 &&
                            <button
                                onClick={checkoutHandler}
                                disabled={isAnyQuantityExceedingStock || bagItems?.some(item => item.stock === 0)}
                            >
                                Checkout
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Bag;