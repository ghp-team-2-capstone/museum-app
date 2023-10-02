import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchReviewsByMuseumId,
  fetchSingleMuseumById,
} from "../../helpers/fetching";
import SingleReview from "../Reviews/SingleReview";
import "./AllMuseums.css";
import AverageRating from "../Reviews/AverageRating";

export default function GetSingleMuseum({ token, museumId, userId }) {
  const navigate = useNavigate();
  const params = useParams();
  const [museum, setMuseum] = useState({});
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
  async function getMuseumDetails() {
    try {
      const museumData = await fetchSingleMuseumById(params.museumId);
      setMuseum(museumData);
      const museumReviews = await fetchReviewsByMuseumId(params.museumId);
      setReviews(museumReviews);
    } catch (err) {
      setError("Failed to fetch museum details. Please try again later.");
    }
  }

    getMuseumDetails();
  }, [params.museumId]);

  return (
    <div className="single-museum-page">
      {/* MUSEUM DETAILS  */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="single-museum-card museum-item" key={museum.museumId}>
          <h3 className="museum-headers">{museum.museumName}</h3>
          <p>{museum.description}</p>
          <img
            src={museum.image}
            alt={museum.museumName}
            className="museum-image"
          />
          <a
            href={museum.link}
            target="_blank"
            rel="noopener noreferrer"
            className="museum-link"
          >
            Learn More
          </a>
          <br />

          {/* REVIEWS */}
          <div className="averageRating">
            <AverageRating museumId={params.museumId} reviews={reviews} />
          </div>

          <SingleReview
            museumId={params.museumId}
            token={token}
            userId={userId}
          />

          <button
            className="museum-buttons"
            onClick={() => {
              navigate(`/map`);
            }}
          >
            Back to Map
          </button>
        </div>
      )}
    </div>
  );
}
