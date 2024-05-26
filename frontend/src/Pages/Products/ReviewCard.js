import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import StarRating from "./StarRating";
import { useAlert } from "react-alert";


const ReviewCard = ({ review }) => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { user } = useSelector((state) => state.user)
  const { isDeleted, error } = useSelector((state) => state.review)
  const { id } = useParams()

  const isUserReview = review.user === user?._id;


  function handleDelete() {
    dispatch(deleteReview(review._id, id))
  }



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (isDeleted) {
      dispatch(getProductDetails(id))
      dispatch({ type: "DELETE_REVIEW_RESET" });
    }
  }, [dispatch, alert, error, isDeleted,id])


  return <>
      <div className="reviewCard ">
        <div className="user-review-details d-flex align-items-center justify-content-between">
          <div className="d-flex d-flex align-items-center gap-2">
            <i class="bi bi-person-circle"></i>
            <h1>{review.name}</h1>
          </div>
          {isUserReview &&
            <div className="delete-review" onClick={handleDelete}>
              <i class="bi bi-trash3"></i>
            </div>
          }
        </div>
        <StarRating rating={review.rating} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
  </>
};

export default ReviewCard;
