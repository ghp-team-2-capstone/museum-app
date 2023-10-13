import React, { useState, useEffect } from "react";
import { fetchReviewsByMuseumId } from "../../helpers/fetching";
import AverageRating from "../Reviews/AverageRating";
import { useNavigate } from "react-router-dom";
import SingleReview from "../Reviews/SingleReview";

const MapPanel = ({ museums, selectedMarker, setSelectedMarker }) => {
  const [error, setError] = useState(null);
  const [museumReviews, setMuseumReviews] = useState({});
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [selectedMuseumReviews, setSelectedMuseumReviews] = useState([]);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const navigate = useNavigate();

  // FETCH REVIEWS BY MUSEUM ID
  const fetchReviewsForMuseum = async (museumId) => {
    try {
      if (!museumReviews[museumId]) {
        const reviewsData = await fetchReviewsByMuseumId(museumId);
        setMuseumReviews((prevReviews) => ({
          ...prevReviews,
          [museumId]: reviewsData,
        }));
        setSelectedMuseumReviews(reviewsData);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  useEffect(() => {
    museums.forEach((museum) => {
      fetchReviewsForMuseum(museum.museumId);
    });
  }, [museums]);

  useEffect(() => {
    if (selectedMarker) {
      setSelectedMuseum(selectedMarker);
      fetchReviewsForMuseum(selectedMarker.museumId);
    } else {
      setSelectedMuseum(null);
    }
  }, [selectedMarker]);

  const handleSelectMuseumByName = (museum) => {
    setSelectedMarker(museum);
    fetchReviewsForMuseum(museum.museumId);
  };

  const exitSingleMuseumView = () => {
    setSelectedMarker(null);
    setSelectedMuseum(null);
    setSelectedMuseumReviews([]);
  };

  const toggleDescriptionExpansion = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const closeDescription = () => {
    setDescriptionExpanded(false);
  };

  return (
    <div className="side-panel">
      <br />
      {selectedMuseum ? (
        <div className="single-museum-content">
          <div onClick={() => navigate(`/museums/${selectedMarker.museumId}`)}>
            <img
              src={selectedMuseum.image}
              alt={selectedMuseum.museumName}
              style={{ width: "300px" }}
            />
          </div>
          <h3>
            {selectedMuseum.museumName}

            <div className="detailsButton-map-container">
              <button
                className="detailsButton-map"
                onClick={() => {
                  navigate(`/museums/${selectedMarker.museumId}`);
                }}
              >
                See Details
              </button>
            </div>
          </h3>
          <p>
            {descriptionExpanded
              ? selectedMuseum.description
              : selectedMuseum.description.length > 150
              ? selectedMuseum.description.substring(0, 150) + "..."
              : selectedMuseum.description}
          </p>
          {selectedMuseum.description.length > 150 && (
            <button
              onClick={toggleDescriptionExpansion}
              className="see-more-button"
            >
              {descriptionExpanded ? "See Less" : "See More"}
            </button>
          )}{" "}
          <br />
          <SingleReview
            museumId={selectedMuseum.museumId}
          />
          <div className="exit-button-container">
            <button className="exit-button" onClick={exitSingleMuseumView}>
              &#x2716;
            </button>
          </div>
        </div>
      ) : (
        <div className="all-museums-content">
          <ul>
            {museums.map((museum) => (
              <li key={museum.museumName}>
                <div
                  onClick={() => {
                    handleSelectMuseumByName(museum);
                    closeDescription();
                  }}
                >
                  <img
                    src={museum.image}
                    alt={museum.museumName}
                    style={{ width: "300px" }}
                  />
                </div>
                <h4
                  onClick={() => {
                    handleSelectMuseumByName(museum);
                    closeDescription();
                  }}
                >
                  {museum.museumName}
                </h4>
                <AverageRating
                  museumId={museum.museumId}
                  reviews={museumReviews[museum.museumId] || []}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MapPanel;
