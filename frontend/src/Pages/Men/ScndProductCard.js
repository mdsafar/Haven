import React from "react";
import "./ScndProductCard.css"
import { Link }from "react-router-dom"

const ScndProductCard = ({products})=>{
    return<>
         <Link className="scnd_product_card" to={`/product/${products._id}`}>
             <img src={products.images[0].url} alt="" />
               <div className="scnd_product_details d-flex justify-content-between">
               <div className="scnd_details">
                <h4>{products.name}</h4>
                <p> {products.category}</p>
                </div>
                <div className="scnd_price" >
                <p >₹ {products.price}.00</p>
                </div>
                </div>
           </Link>
    </>
}

export default ScndProductCard