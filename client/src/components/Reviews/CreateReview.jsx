// CreateReview.js
import React, { useState } from "react";
import StarRating from "./StarRating";
import "./ReviewCard.css"; // Import the CSS file for the review section
import { addReview, fetchAllReviews, fetchReviewsByMuseumId } from "../../helpers/fetching";
import { useNavigate } from "react-router-dom";

export default function CreateReview({ setReviews, museumId, token, userId }) {
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Define the navigate function

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await addReview(
        userId,
        museumId,
        rating,
        body,
        new Date().toISOString(),
        token
      );

      const updateReview = await fetchReviewsByMuseumId(museumId);
      setReviews(updateReview);
      console.log("New reviews", updateReview);

      setRating(0);
      setBody("");

      navigate("./", { replace: true }); // Use the navigate function to redirect

    } catch (error) {
      setError("Failed to create the review. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (

    <div className="create-review">
      <h3 className="create-review-title">Add a Review</h3>
      <div className="create-review-rating">
        Rating: <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <form onSubmit={submitHandler} className="create-review-form">
        <textarea
          className="create-review-input"
          placeholder="Write your review..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="create-review-button">
          Submit Review
        </button>
      </form>
    </div>
  );
}













// import { useState, useEffect } from "react";
// import { addReview, fetchAllReviews, fetchReviewsByMuseumId } from "../../helpers/fetching";
// import { useNavigate } from "react-router-dom";
// import StarRating from "./StarRating";
// import "./ReviewCard.css"; // Import the CSS file for the review section

// export default function CreateReview({ setReviews, museumId, token, userId }) {
//   const [newReview, setNewReview] = useState({ rating: 0, body: "" });
//   const [rating, setRating] = useState(0);
//   const [body, setBody] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//     setNewReview({ ...newReview, rating: newRating });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     async function createReview() {
//       const result = await addReview(
//         userId,
//         museumId,
//         rating,
//         body,
//         new Date().toISOString(),
//         token
//       );

//       const updateReview = await fetchReviewsByMuseumId(museumId);
//       setReviews(updateReview);
//       console.log("new reviews", updateReview);
//       navigate("./", { replace: true });

//       return result;
//     }
//     createReview();

//     setRating(0);
//     setBody("");
//   };

//   return (
//     <>
//       <h3>Add a review</h3>
//       Rating: <StarRating rating={rating} onRatingChange={handleRatingChange} />
//       <form onSubmit={submitHandler}>
//         <input
//           placeholder="body"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <br />

//         <button type="submit">Create Review</button>
//       </form>
//     </>
//   );
// }










// import { useState, useEffect } from "react";
// import { addReview, fetchAllReviews, fetchReviewsByMuseumId } from "../../helpers/fetching";
// import { useNavigate } from "react-router-dom";
// import StarRating from "./StarRating";
// import "./ReviewCard.css"; // Import the CSS file for the review section

// export default function CreateReview({ setReviews, museumId, token, userId }) {
//   const [newReview, setNewReview] = useState({ rating: 0, body: "" });
//   const [rating, setRating] = useState(0);
//   const [body, setBody] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//     setNewReview({ ...newReview, rating: newRating });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     async function createReview() {
//       const result = await addReview(
//         userId,
//         museumId,
//         rating,
//         body,
//         new Date().toISOString(),
//         token
//       );

//       const updateReview = await fetchReviewsByMuseumId(museumId);
//       setReviews(updateReview);
//       console.log("new reviews", updateReview);
//       navigate("./", { replace: true });

//       return result;
//     }
//     createReview();

//     setRating(0);
//     setBody("");
//   };

//   return (
//     <>
//       <h3>Add a review</h3>
//       Rating: <StarRating rating={rating} onRatingChange={handleRatingChange} />
//       <form onSubmit={submitHandler}>
//         <input
//           placeholder="body"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <br />

//         <button type="submit">Create Review</button>
//       </form>
//     </>
//   );
// }
