import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReviewsByMuseumIdwithUsername } from "../../helpers/fetching";
import { deleteReview } from "../../helpers/fetching";
import EditReview from "./EditReview";
import StarRating from "./StarRating";
import CreateReview from "./CreateReview";
import AverageRating from "./AverageRating";
import "./ReviewCard.css"; // Import the CSS file for the review section

export default function SingleReview({ museumId, token, userId }) {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // FETCH REVIEWS BY MUSEUMID
  useEffect(() => {
    async function getMuseumReviews() {
      if (museumId === null) {
        setReviews([]);
        return;
      }

      try {
        const museumReviews = await fetchReviewsByMuseumIdwithUsername(
          museumId
        );
        console.log("Museum Reviews: ", museumReviews);
        setReviews(museumReviews || []);
      } catch (error) {
        console.error("Error fetching reviews for museum:", error);
      }
    }
    getMuseumReviews();
  }, [museumId]);

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
      navigate("./", { replace: true });
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
      <div className="averageRating">
        <AverageRating museumId={museumId} reviews={reviews} />
      </div>

      <h3 className="review-title">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews available</p>
      ) : (
        reviews.map((review) => (
          <div key={review.reviewId} className="player-card">
            <StarRating
              rating={review.rating}
              onRatingChange={() => {}}
              disableHover={true}
            />
            <p className="review-body">{review.body}</p>
            <p className="review-date">{formatDate(review.date)}</p>
            <div>
              <p className="review-username">{review.username}</p>
            </div>

            {token && userId === review.userId && (
              <div className="review-actions">
                <button
                  className="edit-review-button"
                  onClick={() => handleEditReview(review)}
                >
                  Edit Review
                </button>
                <button
                  className="delete-review-button"
                  onClick={() => handleDeleteReview(review.reviewId)}
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
      {token && (
        <CreateReview
          reviews={reviews}
          setReviews={setReviews}
          token={token}
          museumId={museumId}
          userId={userId}
        />
      )}
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchReviewsByMuseumIdwithUsername } from "../../helpers/fetching";
// import { deleteReview } from "../../helpers/fetching";
// import EditReview from "./EditReview";
// import StarRating from "./StarRating";
// import CreateReview from "./CreateReview";
// import AverageRating from "./AverageRating";

// export default function SingleReview({ museumId, token, userId }) {
//   const [reviews, setReviews] = useState([]);
//   const [selectedReview, setSelectedReview] = useState(null);

//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   // FETCH REVIEWS BY MUSEUMID
//   useEffect(() => {
//     async function getMuseumReviews() {
//       if (museumId === null) {
//         setReviews([]);
//         return;
//       }

//       try {
//         const museumReviews = await fetchReviewsByMuseumIdwithUsername(
//           museumId
//         );
//         console.log("Museum Reviews: ", museumReviews);
//         setReviews(museumReviews || []);
//       } catch (error) {
//         console.error("Error fetching reviews for museum:", error);
//       }
//     }
//     getMuseumReviews();
//   }, [museumId]);

//   const handleEditReview = (review) => {
//     setSelectedReview(review);
//   };

//   const handleCancelEdit = () => {
//     setSelectedReview(null);
//   };

//   const handleDeleteReview = async (reviewId) => {
//     try {
//       const result = await deleteReview(reviewId, token);
//       console.log("reviewId: ", reviewId);
//       setReviews((prevReviews) =>
//         prevReviews.filter((review) => review.reviewId !== reviewId)
//       );
//       navigate("./", { replace: true });
//       return result;
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateReview = (editedReview) => {
//     setReviews((prevReviews) =>
//       prevReviews.map((review) =>
//         review.reviewId === editedReview.reviewId
//           ? { ...review, ...editedReview }
//           : review
//       )
//     );
//   };

//   return (
//     <>
//       <div className="averageRating">
//         <AverageRating museumId={museumId} reviews={reviews} />
//       </div>

//       <h3>Reviews</h3>
//       {reviews.length === 0 ? (
//         <p>No reviews available</p>
//       ) : (
//         reviews.map((review) => (
//           <div key={review.reviewId}>
//             <StarRating
//               rating={review.rating}
//               onRatingChange={() => {}}
//               disableHover={true}
//             />
//             <p>{review.body}</p>
//             <p>{review.date}</p>
//             <div>
//               <p>{review.username}</p>
//             </div>

//             {token && userId === review.userId && (
//               <div>
//                 <button onClick={() => handleEditReview(review)}>
//                   Edit Review
//                 </button>
//                 <button
//                   onClick={() => handleDeleteReview(review.reviewId, token)}
//                 >
//                   Delete Review
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//       {selectedReview && (
//         <EditReview
//           reviewId={selectedReview.reviewId}
//           onCancel={handleCancelEdit}
//           token={token}
//           userId={userId}
//           museumId={selectedReview.museumId}
//           onUpdateReview={updateReview}
//         />
//       )}
//       {token && (
//         <CreateReview
//           reviews={reviews}
//           setReviews={setReviews}
//           token={token}
//           museumId={museumId}
//           userId={userId}
//         />
//       )}
//     </>
//   );
// }
