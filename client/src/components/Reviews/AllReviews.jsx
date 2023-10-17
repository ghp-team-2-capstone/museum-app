import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../../helpers/fetching";

export default function AllReviews({ token }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // FETCH ALL REVIEWS
  useEffect(() => {
    const renderReviews = async () => {
      try {
        const reviewArray = await fetchAllReviews();
        console.log("Review Array: ", reviewArray);
        setReviews(reviewArray);
        return reviewArray;
      } catch (error) {
        setError("Failed to fetch reviews. Please try again later.");
      }
    };
    renderReviews();
  }, []);

  return (
    <>
      <h1> Get All Reviews</h1>
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <p>Rating: {review.rating}</p>
          <p>{review.body}</p>
          <p>{review.date}</p>
        </div>
      ))}
    </>
  );
}
