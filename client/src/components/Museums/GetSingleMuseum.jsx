import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchReviewsByMuseumIdwithUsername,
  fetchSingleMuseumById,
} from "../../helpers/fetching";
import SingleReview from "../Reviews/SingleReview";
import "./AllMuseums.css";
import FavoriteMuseum from "./FavoriteMuseum";

export default function GetSingleMuseum({ token, userId }) {
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
        const museumReviews = await fetchReviewsByMuseumIdwithUsername(
          params.museumId
        );
        setReviews(museumReviews);
      } catch (err) {
        setError("Failed to fetch museum details. Please try again later.");
      }
    }

    getMuseumDetails();
  }, [params.museumId]);

  return (
    <div className="single-museum-page">
      <div className="page-header-single-museum">
        <h1>{museum.museumName}</h1>
      </div>
      {/* MUSEUM DETAILS  */}
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="single-museum-card museum-item" key={museum.museumId}>
          <div className="flex items-center justify-center">
            {token && (
              <FavoriteMuseum
                userId={userId}
                museumId={params.museumId}
                token={token}
              />
            )}
          </div>
            {/* <h3 className="museum-headers-single">{museum.museumName}</h3> */}
          <div className="single-content">
            <img
              src={museum.image}
              alt={museum.museumName}
              className="museum-image-single"
            />
            <a
              href={museum.link}
              target="_blank"
              rel="noopener noreferrer"
              className="museum-link-single"
            >
              Learn More
            </a>
            <br />
            <p style={{ textAlign: 'justify' }}>{museum.description}</p><br/>

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
          </div>{" "}
        </div>
      )}
    </div>
  );
}
