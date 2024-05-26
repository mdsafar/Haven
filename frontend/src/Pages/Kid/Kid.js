import React, { useEffect } from "react";
import {Col,Row} from "reactstrap"
import ScndProductCard from "../Men/ScndProductCard";
import { getProducts } from "../../actions/productAction";
import {useSelector,useDispatch} from "react-redux"
import Loader from "../../Components/Loader/Loader";
import { useAlert } from "react-alert";


const Kid = () => {
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
                           <h1>Kids</h1>
                        </div>
                        <div className="scnd_card_container">
                        {products.map((products,index)=>{
                            return products.for === "kids" && <ScndProductCard key={index} products={products} />
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

export default Kid;