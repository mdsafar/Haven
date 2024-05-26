import React, { useEffect, useState } from "react";
import "./ProductDetails.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview } from "../../actions/productAction";
import { useAlert } from "react-alert"
import Loader from "../../Components/Loader/Loader";
import ReviewCard from "./ReviewCard";
import StarRating from "./StarRating";
import { addItemsToBag, getBagItem } from "../../actions/bagAction";

const ProductDetails = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const { isAuthenticated, user } = useSelector((state) => state.user)
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { id } = useParams()

    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [reviewOpen, setReviewOpen] = useState(false)
    const [comment, setComment] = useState("")
    const [hoveredImage, setHoveredImage] = useState("");


    useEffect(()=>{
        dispatch(getProductDetails(id))
    },[dispatch,id])

    function handleReviewToggle() {
        setReviewOpen(!reviewOpen)
    }

    function handleSubmitToggle() {
        setOpen(!open)
        if (!open) {
            setRating(0);
        }
    }

    function handleReviewSubmit() {
        if (rating !== 0 && comment !== '') {
            const myForm = new FormData();
            myForm.set("rating", rating)
            myForm.set("comment", comment)
            myForm.set("productId", id)
            dispatch(newReview(myForm)).then(()=>{
                dispatch(getProductDetails(id))
            })
            setOpen(false)
        }

    }

    function addToBagHandler() {
        if (isAuthenticated) {
            dispatch(addItemsToBag(user._id, id, 1)).then(()=>{
                dispatch(getBagItem(user._id))
               alert.success('Item Added to Bag')
            })
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "CLEAR_ERRORS" });
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch({ type: "CLEAR_ERRORS" });
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: "NEW_REVIEW_RESET" });
        }
    }, [dispatch,alert, success, error, reviewError])

    return <>
        {loading ? (
            <Loader />
        ) : (
            <div className="product-details-container">
                <section id="prodetails">
                    <div className="main-img-container">
                        <div className="img-sec">
                            <div className="pro-image">
                                <div className="main-img" >
                                    {product.images && product.images.length > 0 && (
                                        <img src={hoveredImage || product.images[0].url} alt="" />
                                    )}
                                </div>
                                <div className="small-img-container">
                                    {product.images &&
                                        product.images.map((img, i) => (
                                            <div className="small-img-group" onMouseEnter={() => setHoveredImage(img.url)} >
                                                <img
                                                    className="CarouselImage"
                                                    key={i}
                                                    src={img.url}
                                                    alt={`${i} Slide`}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-details-container">
                        <div className="single-pro-details">
                            <h3>{product.name}</h3>
                            <h5>{product.category}</h5>
                            <h4>MRP: ₹ {product.price}.00</h4>
                            <p>incl. of taxes</p>
                            <p>(Also includes all applicable duties)</p>
                            <div className="add-bag">
                                <button onClick={addToBagHandler}>Add to Bag</button>
                            </div>
                            <div className="about-shoe">
                                <span>
                                    {product.description}
                                </span>
                            </div>

                            <div className="review-submit-section" >
                                <div className="review-box d-flex justify-content-between align-items-center" onClick={handleSubmitToggle} >
                                    <h1>Submit Review</h1>
                                    <div className="review-arrow" >
                                        {!open ? (
                                            <i class="bi bi-chevron-down"></i>
                                        ) : (
                                            <i class="bi bi-chevron-up"></i>
                                        )}
                                    </div>
                                </div>
                                {isAuthenticated ? (
                                    open &&
                                    <div className="review-details">
                                        <div className="review-stars d-flex">
                                            <div onClick={() => setRating(1)}>
                                                1 <i class="bi bi-star"></i>
                                            </div>
                                            <div onClick={() => setRating(2)}>
                                                2 <i class="bi bi-star"></i>
                                            </div>
                                            <div onClick={() => setRating(3)}>
                                                3 <i class="bi bi-star"></i>
                                            </div>
                                            <div onClick={() => setRating(4)}>
                                                4 <i class="bi bi-star"></i>
                                            </div>
                                            <div onClick={() => setRating(5)}>
                                                5 <i class="bi bi-star"></i>
                                            </div>
                                        </div>
                                        {rating !== 0 ? (
                                            <div className="rating mt-3">
                                                Chosen Rating: {rating} <i className="bi bi-star"></i>
                                            </div>
                                        ) : (
                                            <div className="rating mt-3">
                                                Please choose a rating.
                                            </div>
                                        )}
                                        <div className="review-input">
                                            <h3>Your Review :</h3>
                                            <textarea
                                                className="submitDialogTextArea"
                                                cols="40"
                                                rows="6"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></textarea>
                                            <button onClick={handleReviewSubmit}>Submit</button>
                                        </div>
                                    </div>
                                ) : (
                                    open &&
                                    <div className="Login-to-review">
                                        <Link to="/login"><button >Login</button></Link>
                                    </div>
                                )}
                            </div>
                            <div className={`review-container ${!reviewOpen ? 'unreveal' : ''}`}>
                                <div className="reviews-section d-flex justify-content-between align-items-center" onClick={handleReviewToggle} >
                                    <h1>Reviews({product.numOfReviews})</h1>
                                    <div className="review-arrow d-flex align-items-center gap-2" >
                                        <StarRating rating={product.ratings} />
                                        {!reviewOpen ? (
                                            <i class="bi bi-chevron-down"></i>
                                        ) : (
                                            <i class="bi bi-chevron-up"></i>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {reviewOpen &&
                    <div className={`reviews d-flex  ${reviewOpen ? 'unreveal' : ''}`}>
                        {product.numOfReviews === 0 ?
                            (<p className="noReviews">No Reviews Yet</p>
                            ) : (
                                product.reviews &&
                                product.reviews
                                    .sort((a, b) => {
                                        if (a.user === user?._id) return -1;
                                        if (b.user === user?._id) return 1
                                        return 0
                                    })
                                    .map((review, index) => {
                                        return <ReviewCard key={index} review={review} />
                                    })
                            )
                        }
                    </div>
                }
            </div>
        )
        }
    </>
}

export default ProductDetails