import React, { useState } from "react";
import "./BagItemCard.css";
import { useDispatch, useSelector } from "react-redux";
import {getBagItem, removeItemsFromBag, updateQuantity } from "../../actions/bagAction";
import { Link } from "react-router-dom";


const BagItemCard = ({ item }) => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.user)
  const [quantity, setQuantity] = useState(item.quantity || 1);

  function deleteBagItem() {
    dispatch(removeItemsFromBag(item.product)).then(()=>{
      dispatch(getBagItem(user?._id))
    })
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= item.stock) {
      setQuantity(newQuantity);
      dispatch(updateQuantity(item.product, newQuantity));
    }
  }

  return <>
    <div className="bagItemCard d-flex">
      <div className="bag-card-img">
        <img src={item.image} alt="ssa" />
      </div>
      <div className="bag-detail-container d-flex ">
        <div className="bag-detail-box d-flex ">
          <div className="bag-card-details d-flex">
            <Link to={`/product/${item.product}`}><h1 >{item.name}</h1></Link>
            <span>{item.category} </span>
            <div className="bag-quantity d-flex gap-1 align-items-center">
              <h1>Quantity</h1>
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => {
                  return <option value={i + 1}>{i + 1}</option>
                })}
              </select>
            </div>
              <div className="stock-indicator">
               {item.stock !== 0 ? (
                <p>{`Only ${item.stock} Stock Available`}</p>
               ):(
                <p>Out of Stock</p>
               )}  
              </div>
          </div>
          <div className="bag-price">
            <p>MRP: ₹ {item.price}.00</p>
          </div>
        </div>
        <div className="bag-delete">
          <i onClick={deleteBagItem} class="bi bi-trash3"></i>
        </div>
      </div>
    </div>
  </>
};

export default BagItemCard;