import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSingleMuseumById } from "../../helpers/fetching";
import SingleReview from "../Reviews/SingleReview";
import "./AllMuseums.css";

export default function GetSingleMuseum() {
  const navigate = useNavigate();
  const params = useParams();
  const [museum, setMuseum] = useState({});
  const [error, setError] = useState(null);

  async function getMuseumDetails() {
    try {
      const museumData = await fetchSingleMuseumById(params.museumId);
      setMuseum(museumData);
    } catch (err) {
      setError("Failed to fetch museum details. Please try again later.");
    }
  }

  useEffect(() => {
    getMuseumDetails();
  }, [params.museumId]);

  return (
    <div className="single-museum-page">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="single-museum-card museum-item" key={museum.museumId}>
          <h3 className="museum-headers">{museum.museumName}</h3>
          <p>{museum.description}</p>
          <img src={museum.image} alt={museum.museumName} className="museum-image" />
          <a href={museum.link} target="_blank" rel="noopener noreferrer" className="museum-link">
            Learn More
          </a>
          <br />

          <SingleReview museumId={params.museumId} />

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


