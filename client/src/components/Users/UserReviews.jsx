import React, { useState, useEffect } from "react";
import { fetchReviewsByUserId, deleteReview } from "../../helpers/fetching";
import StarRating from "../Reviews/StarRating";
import EditReview from "../Reviews/EditReview";
import "./JournalEntries.css"; // Import the CSS file for the review section

export default function UserReviews({ userId, token }) {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    async function getUserReviews() {
      if (userId === null) {
        setReviews([]);
        return;
      }
      try {
        const userReviews = await fetchReviewsByUserId(userId);
        console.log("User Reviews Response: ", userReviews);
        setReviews(userReviews || []);
      } catch (error) {
        console.error("Error fetching reviews for museum:", error);
        setError(error);
      }
    }

    getUserReviews();
  }, []);

  const handleEditReview = (review) => {
    setSelectedReview(review);
  };

  const handleCancelEdit = () => {
    setSelectedReview(null);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const result = await deleteReview(reviewId, token);
      console.log("reviewId: ", reviewId);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.reviewId !== reviewId)
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const updateReview = (editedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.reviewId === editedReview.reviewId
          ? { ...review, ...editedReview }
          : review
      )
    );
  };

  return (
    <>
      <div className="page-header-my-reviews">
        <h1>My Reviews</h1>
      </div>
      <div className="journal-entries-container user-reviews-container">
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.reviewId}
              className="journal-entry-card user-review-card"
            >
              <p>{review.museumName}</p>
              <StarRating
                rating={review.rating}
                onRatingChange={() => {}}
                disableHover={true}
              />

              <p>{review.body}</p>
              <p>{formatDate(review.date)}</p>
              <div>
                <p>{review.username}</p>
              </div>

              {token && userId === review.userId && (
                <div>
                  <button
                    onClick={() => handleEditReview(review)}
                    className="edit-button"
                  >
                    Edit Review
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.reviewId)}
                    className="delete-button"
                  >
                    Delete Review
                  </button>
                </div>
              )}
            </div>
          ))
        )}
        {selectedReview && (
          <EditReview
            reviewId={selectedReview.reviewId}
            onCancel={handleCancelEdit}
            token={token}
            userId={userId}
            museumId={selectedReview.museumId}
            onUpdateReview={updateReview}
          />
        )}
      </div>
    </>
  );
}
