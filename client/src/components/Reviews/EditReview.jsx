import React, { useState, useEffect } from "react";
import { editReview, fetchSingleReview } from "../../helpers/fetching";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import "./ReviewCard.css"; // Import the CSS file for the review section

export default function EditReview({
  reviewId,
  onCancel,
  token,
  museumId,
  userId,
  onUpdateReview,
}) {
  const [newRating, setNewRating] = useState("");
  const [newBody, setNewBody] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReviewData() {
      try {
        const review = await fetchSingleReview(reviewId);
        setNewRating(review.rating);
        setNewBody(review.body);
      } catch (error) {
        setError("Failed to fetch review data. Please try again later.");
      }
    }
    fetchReviewData();
  }, [reviewId]);

  const handleEditReview = async (event) => {
    try {
      event.preventDefault();

      const editedReview = await editReview(
        reviewId,
        userId,
        museumId,
        newRating,
        newBody,
        new Date().toISOString(),
        token
      );
      navigate("./", { replace: true });
      if (editedReview) {
        onUpdateReview(editedReview);
        onCancel();
      } else {
        console.error("Failed to update review.");
      }
    } catch (error) {
      console.error("Error updating review", error);
    }
  };

  return (
    <div className="edit-review-container"> {/* Apply edit-review-container class for styling */}
      <h2>Edit Review</h2>
      {error && <p className="error">{error}</p>}
      <br />
      <form onSubmit={handleEditReview}>
        <label>Rating: </label>
        <StarRating
          rating={newRating}
          onRatingChange={(newRating) => setNewRating(newRating)}
        />

        <label>Review Text: </label>
        <textarea
          className="edit-review-textarea" // Apply edit-review-textarea class for styling
          name="newBody"
          id="newBody"
          value={newBody}
          onChange={(event) => setNewBody(event.target.value)}
        />
        <button className="new-button" >Update</button> {/* Apply update-button class for styling */}
        <button className="cancel-button" onClick={onCancel}>Cancel</button> {/* Apply cancel-button class for styling */}
      </form>
    </div>
  );
}








// import React, { useState, useEffect } from "react";
// import { editReview, fetchSingleReview } from "../../helpers/fetching";
// import { useNavigate } from "react-router-dom";
// import StarRating from "./StarRating";

// export default function EditReview({
//   reviewId,
//   onCancel,
//   token,
//   museumId,
//   userId,
//   onUpdateReview,
// }) {
//   const [newRating, setNewRating] = useState("");
//   const [newBody, setNewBody] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchReviewData() {
//       try {
//         const review = await fetchSingleReview(reviewId);
//         setNewRating(review.rating);
//         setNewBody(review.body);
//       } catch (error) {
//         setError("Failed to fetch review data. Please try again later.");
//       }
//     }
//     fetchReviewData();
//   }, [reviewId]);

//   const handleEditReview = async (event) => {
//     try {
//       event.preventDefault();

//       const editedReview = await editReview(
//         reviewId,
//         userId,
//         museumId,
//         newRating,
//         newBody,
//         new Date().toISOString(),
//         token
//       );
//       navigate("./", { replace: true });
//       if (editedReview) {
//         onUpdateReview(editedReview)
//         onCancel();
//       } else {
//         console.error("Failed to update review.");
//       }
//     } catch (error) {
//       console.error("Error updating review", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Review</h2>
//       {error && <p className="error">{error}</p>}
//       <br />
//       <form onSubmit={handleEditReview}>
//         <label>Rating: </label>
//         <StarRating
//           rating={newRating}
//           onRatingChange={(newRating) => setNewRating(newRating)}
//         />

//         <label>Review Text: </label>
//         <input
//           type="text"
//           name="newBody"
//           id="newBody"
//           value={newBody}
//           onChange={(event) => setNewBody(event.target.value)}
//         />
//         <button type="submit">Update</button>
//         <button onClick={onCancel}>Cancel</button>
//       </form>
//     </div>
//   );
// }
