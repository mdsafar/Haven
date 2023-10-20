import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;

  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(<i  key={i} class="bi bi-star-fill"></i>);
  }

  if (halfStars === 1) {
    starElements.push(<i key={fullStars} className="bi bi-star-half"></i>);
  }

  for (let i = 0; i < emptyStars; i++) {
    starElements.push(<i key={fullStars + i + halfStars} className="bi bi-star"></i>);
  }

  return <p className="star-rating">{starElements}</p>;
};

export default StarRating;