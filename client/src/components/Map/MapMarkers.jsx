import React, { useEffect, useState } from "react";
import { Marker, InfoWindowF } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import {
  fetchAllMuseums,
  fetchReviewsByMuseumId,
} from "../../helpers/fetching";
// import markersIcon from "../Images/markers.png";
import AverageRating from "../Reviews/AverageRating";

const MapMarkers = ({
  searchParam,
  selectedTypes,
  selectedMarker,
  setSelectedMarker,
}) => {
  const navigate = useNavigate();
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH REVIEWS BY MUSEUM ID
  const fetchReviewsForMuseum = async (museumId) => {
    try {
      const reviewsData = await fetchReviewsByMuseumId(museumId);
      setReviews(reviewsData);
    } catch (error) {
      setError("Failed to fetch reviews. Please try again later.");
    }
  };

  useEffect(() => {
    const renderMuseums = async () => {
      try {
        const museumArray = await fetchAllMuseums();
        // console.log("Museum Array: ", museumArray);
        setMuseums(museumArray);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch museums. Please try again later.");
        setIsLoading(false);
      }
    };
    renderMuseums();
  }, []);

  const searchedMuseums = museums.filter((museum) => {
    return (
      //boolean expression
      searchParam.length === 0 ||
      museum.museumName.toLowerCase().includes(searchParam)
    );
  });

  const filteredMuseums = searchedMuseums.filter((museum) => {
    //boolean expression that involves museum.type
    return selectedTypes.includes(museum.type);
  });

  return (
    <>
      {filteredMuseums.map((museum) => (
        <Marker
          key={museum.museumId}
          position={{
            lat: parseFloat(museum.lat),
            lng: parseFloat(museum.lng),
          }}
          icon={{
            url: "/Images/markers.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() => {
            fetchReviewsForMuseum(museum.museumId);
            setSelectedMarker(museum);
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindowF
          position={{
            lat: parseFloat(selectedMarker.lat) + 0.01,
            lng: parseFloat(selectedMarker.lng),
          }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div style={{ maxWidth: "300px", maxHeight: "50vh" }}>
            <img
              src={selectedMarker.image}
              alt={selectedMarker.museumName}
              style={{ width: "250px" }}
            />
            <h3>{selectedMarker.museumName}</h3>

            <AverageRating
              museumId={selectedMarker.museumId}
              reviews={reviews}
            />

            <button
              className="detailsButton"
              onClick={() => {
                navigate(`/museums/${selectedMarker.museumId}`);
              }}
            >
              See Details
            </button>

            <p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.lat},${selectedMarker.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </p>
          </div>
        </InfoWindowF>
      )}
    </>
  );
};
export default MapMarkers;
