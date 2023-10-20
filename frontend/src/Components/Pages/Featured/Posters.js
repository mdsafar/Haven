import { useEffect } from "react"
import React from "react"
import {Col,Row} from "reactstrap"

const Posters = ()=>{
    useEffect(() => {
        // Add the JavaScript scroll reveal code here
        window.addEventListener("scroll", () => {
          const heroShop = document.querySelector(".hero_shop");
          const latestshop = document.querySelector(".latest_shop")
          const trendingshop = document.querySelector(".men_trending_shop")

          if (heroShop) {
            const elementTop = heroShop.getBoundingClientRect().top;

            if (elementTop < window.innerHeight) {
              heroShop.classList.add("reveal");
            }
          }

          if(latestshop){
            const latestTop = latestshop.getBoundingClientRect().top;
           
            if(latestTop < window.innerHeight){
                latestshop.classList.add("reveal")
            }
        }

        if(trendingshop){
         const trendTop = trendingshop.getBoundingClientRect().top;
              
            if(trendTop < window.innerHeight){
             trendingshop.classList.add("reveal")
         }
     }

        });
      }, []);

    return <>
        <section>
        <div className="sec">
         <Row>
             <Col lg="12">
                <div className="hero_content">
                   <div className="hero_heading">
                      <h1>Just In</h1>
                   </div>
                   <div className="hero_img">
                     <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1344,c_limit/32a1c8bd-604f-4979-aba1-1619ad006cd6/nike-just-do-it.jpg" alt=""/>
                     <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_822,c_limit/5bd546f6-bcf2-49db-83c2-8eb5ebc343e1/nike-just-do-it.jpg" alt=""/>
                   </div>
                <div className="hero_shop">
                    <h1>LEBRON XXI. CREATED FOR YOU TO RISE.</h1>
                    <p>Explode during takeoff and land softly in the LeBron XXI</p>
                    <button>Shop</button>
                </div>
                </div>
             </Col>
         </Row>
         </div>
        </section>
 
        <section>
        <div className="sec">
         <Row>
             <Col lg="12">
                <div className="latest_content">
                   <div className="hero_heading">
                      <h1>The Latest</h1>
                   </div>
                   <div className="hero_img">
                     <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1314,c_limit/4257d698-d14f-49d1-b1e1-4a6b670f1341/nike-just-do-it.png" alt=""/>
                     <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_768,c_limit/95a8f030-ba52-4dbf-b2c7-627362b926ac/nike-just-do-it.png" alt=""/>
                   </div>
                </div>
                   </Col>
                   <Col lg="12">
                <div className="latest_shop">
                    <h1>MADE YOU LOOK</h1>
                    <p>Captivate ‘em with craft like Sabrina Ionescu in the Sabrina 1 ‘Magnetic’. With diamond effect stitching, cloud-like cushioning and grippy S-traction, you’ll have all the comfort and control you need to keep your defenders on their toes.</p>
                    <button>Shop</button>
                </div>
                </Col>
         </Row>
         </div>
        </section>

    </>
}

export default Posters;


