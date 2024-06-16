import { useEffect } from "react"
import React from "react"
import { Carousel } from "react-responsive-carousel";
import { Col, Row } from "reactstrap"
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import ProductCard from "./ProductCard";

const Posters = ({ product }) => {
  useEffect(() => {
    // Add the JavaScript scroll reveal code here
    window.addEventListener("scroll", () => {
      const latestshop = document.querySelector(".latest_shop")
      const trendingshop = document.querySelector(".men_trending_shop")

      if (latestshop) {
        const latestTop = latestshop.getBoundingClientRect().top;

        if (latestTop < window.innerHeight) {
          latestshop.classList.add("reveal")
        }
      }

      if (trendingshop) {
        const trendTop = trendingshop.getBoundingClientRect().top;

        if (trendTop < window.innerHeight) {
          trendingshop.classList.add("reveal")
        }
      }

    });
  }, []);

  const arrowLeft = (clickHandler, hasPrev) => {
    return (
      <div
        className={`${hasPrev ? "absolute" : "hidden"
          } top-0 bottom-0 left-0 flex justify-center items-center p-3  z-20`}
      >
        <IoIosArrowDropleft className="opacity-30 hover:opacity-100 cursor-pointer" color="white" size={36} onClick={clickHandler} />
      </div>
    );
  }

  const arrowRight = (clickHandler, hasNext) => {
    return (
      <div
        className={`${hasNext ? "absolute" : "hidden"
          } top-0 bottom-0 right-0 flex justify-center items-center p-3 z-20`}
      >
        <IoIosArrowDropright className="opacity-30 hover:opacity-100 cursor-pointer" color="white" size={36} onClick={clickHandler} />
      </div>
    );
  }

  const carouselIndicator = (onClickHandler, isSelected, index, label) => {
    const style = { marginLeft: 10, color: "white", cursor: "pointer" };
    return (
      <span
        className="d-flex"
        style={style}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      >
        <GoDotFill color="white" size={18} className={`${isSelected ? "opacity-45" : "opacity-100"}`} />
      </span>
    );
  }

  return <>
    <section className="pb-0">
      <div className="sec">
        <Row>
          <Carousel autoPlay infiniteLoop showThumbs={false}
            showStatus={false}
            renderArrowPrev={arrowLeft}
            renderArrowNext={arrowRight}
            renderIndicator={carouselIndicator}
            interval={3000} useKeyboardArrows>
            <div className="h-full">
              <img className="h-full object-cover" src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1344,c_limit/a89aec65-b84c-4c01-9a19-d4a683a66b41/nike-just-do-it.jpg" alt="" />
              <div className="hero_shop">
                <h1>LEBRON XXI. CREATED FOR YOU TO RISE.</h1>
                <p>Explode during takeoff and land softly in the LeBron XXI</p>
                <button>Shop</button>
              </div>
            </div>
            <div className="h-full">
              <img className="h-full object-cover" src="https://cdn.sanity.io/images/qa41whrn/prod/a614ef9df7aca1dd7d3530b56c81a3fc6cf0e854-12000x4333.jpg?w=2160&q=80&auto=format" alt="" />

              <div className="hero_shop">
                <h1>LEBRON XXI. CREATED FOR YOU TO RISE.</h1>
                <p>Explode during takeoff and land softly in the LeBron XXI</p>
                <button>Shop</button>
              </div>

            </div>
            <div className="h-full">
              <img className="h-full object-cover" src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/em_in_flat_40_per_commercial_ss24_launch_hp_bnr_d_2571e2caf2.jpg" alt="" />

              <div className="hero_shop">
                <h1>LEBRON XXI. CREATED FOR YOU TO RISE.</h1>
                <p>Explode during takeoff and land softly in the LeBron XXI</p>
                <button>Shop</button>
              </div>

            </div>
          </Carousel>
        </Row>
      </div>
    </section>
    <section>
      <div className="sec">
        <Row>
          <Col>
            <div className="product_lists">
              <div className="hero_heading">
                <h1>Stores</h1>
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
    <section>
      <div className="sec">
        <Row>
          <Col lg="12">
            <div className="latest_content">
              <div className="hero_heading">
                <h1>The Latest</h1>
              </div>
              <div className="hero_img">
                <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1314,c_limit/4257d698-d14f-49d1-b1e1-4a6b670f1341/nike-just-do-it.png" alt="" />
                <img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_768,c_limit/95a8f030-ba52-4dbf-b2c7-627362b926ac/nike-just-do-it.png" alt="" />
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


