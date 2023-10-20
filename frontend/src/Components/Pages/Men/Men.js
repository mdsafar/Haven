import React, {useEffect } from "react";
import {Col,Row} from "reactstrap"
import ScndProductCard from "./ScndProductCard";
import {useSelector, useDispatch} from "react-redux"
import { getProducts } from "../../../actions/productAction";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "react-alert";



const Men = () => {
   const dispatch = useDispatch()
   const alert = useAlert()
    const {products,loading,error} = useSelector((state)=> state.products)
     
    useEffect(()=>{
      if(error){
         alert.error(error)
         dispatch({type:"CLEAR_ERRORS"})
      }
       dispatch(getProducts())
    },[dispatch,alert,error])


    return <>
    {loading ? (
      <Loader/>
    ):(
       <section>
         <div className="sec">
            <Row>
               <Col>
                     <div className="product_lists">
                        <div className="hero_heading">
                           <h1>Men</h1>
                        </div>
                        <div className="scnd_card_container">
                        {products.map((products,index)=>{
                           return products.for === "men" && <ScndProductCard key={index} products={products} />
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

export default Men;