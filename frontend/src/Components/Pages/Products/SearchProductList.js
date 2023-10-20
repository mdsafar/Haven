import React from "react";
import {Row,Col} from "reactstrap"
import ScndProductCard from "../Men/ScndProductCard";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";

const SearchProductList=()=>{
    const {products,loading} = useSelector((state)=> state.searchProducts)


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
                           <h1>Search Result</h1>
                        </div>
                        <div className="scnd_card_container">
                        {products.length === 0 ? <div style={{height: "100vh"}}> <h1>Product Not found</h1> </div> 
                           :
                        products.map((products,index)=>{
                         return <ScndProductCard key={index} products={products} />
                        })}   
                        </div>
                     </div>
               </Col>
            </Row>
         </div>
      </section>
      )}
    </>
}

export default SearchProductList;