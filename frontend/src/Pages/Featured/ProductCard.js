
import React from "react";
import { Link } from "react-router-dom"

const ProductCard = ({ products }) => {

    return <>
        <Link className="product_card" to={`/product/${products._id}`}>
            {products.images && products.images.length > 0 && (
                <img src={products.images[0].url} alt="" />
            )}
            <div className="product_details d-flex justify-content-between">
                <div className="details">
                    <h4>{products.name}</h4>
                    <p> {products.category}</p>
                </div>
                <div className="price" >
                    <p >₹ {products.price}.00</p>
                </div>
            </div>
        </Link>
    </>
}

export default ProductCard