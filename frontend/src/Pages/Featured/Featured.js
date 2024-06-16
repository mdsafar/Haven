import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Col, Row } from "reactstrap"
import "./Featured.css"
import ProductCard from "./ProductCard";
import Posters from "./Posters";
import { getProducts } from "../../actions/productAction";
import Loader from "../../Components/Loader/Loader";
import { useAlert } from "react-alert";

const Featured = () => {
   const dispatch = useDispatch()
   const alert = useAlert()
   const { products, loading, error } = useSelector((state) => state.products)
   const product = products?.slice(0, 10)


   useEffect(() => {
      if (error) {
         alert.error(error)
         dispatch({ type: "CLEAR_ERRORS" })
      }
      dispatch(getProducts())
   }, [dispatch, alert, error])

   return <>
      <Posters product={product}/>
      {loading ? (
         <Loader />
      ) : (
         <section>
            <div className="sec">
               <Row>
                  <Col>
                     <div className="product_lists">
                        <div className="hero_heading">
                           <h1>See What's New</h1>
                        </div>
                        <div className="card_container d-flex">
                           {product?.map((products, index) => {
                              return <ProductCard key={index} products={products} />
                           })}
                        </div>
                     </div>
                  </Col>
               </Row>
            </div>
         </section>
      )
      }

   </>
}

export default Featured;