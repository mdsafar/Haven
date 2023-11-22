import React, { useEffect, useState } from "react";
import "./ProductReviews.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import SideBar from "./Sidebar";
import { getAllReviews } from "../../../actions/productAction";
import StarRating from "../Products/StarRating"
import Loader from "../../Layout/Loader/Loader";

const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, reviews, loading } = useSelector((state) => state.productReviews);


    const [productId, setProductId] = useState("");

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error);
            dispatch({type:"CLEAR_ERRORS"})
        }

    }, [dispatch, alert, error, productId]);

    return <>
        <div className="dashboard">
            <SideBar />
            {loading ? (
                <Loader />
            ) : (
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
                        <div>
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        <button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading || productId === ""}
                        >
                            Search
                        </button>
                    </form>
                 {reviews && reviews.length > 0 ? (
                   reviews.map((review,index)=> {
                    return <div key={index} className="allreviewCard">
                            <div className="user-allreview-details d-flex align-items-center justify-content-between">
                                <div>
                                    <h1> review Id: <span>{review._id}</span></h1>
                                    <h1>Username : <span>{review.name}</span></h1>
                                </div>
                            </div>
                            <div className="d-flex align-items-center allreviewrating" >
                            <StarRating rating={review.rating}/>
                           <h1 >({review.rating})</h1> 
                           </div>
                            <span className="allreviewCardComment">{review.comment}</span>
                        </div>
                    })
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            )}
        </div>
    </>
};

export default ProductReviews;
