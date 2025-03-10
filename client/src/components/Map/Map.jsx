import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MapMarkers from "./MapMarkers";
import customMapStyle from "./mapStyle.json";
import { fetchAllMuseums } from "../../helpers/fetching";
import MapPanel from "./MapPanel";
import "./Map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const mapStyles = {
  width: "100%",
  height: "100vh",
};
const center = {
  lat: 40.73061,
  lng: -73.935242,
};

const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = () => {
  const [searchParam, setSearchParam] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([
    "art",
    "academic",
    "other",
  ]);
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    const renderMuseums = async () => {
      try {
        const museumArray = await fetchAllMuseums();
        setMuseums(museumArray);
      } catch (error) {
        setError("Failed to get museums");
      }
    };
    renderMuseums();
  }, []);

  const filteredMuseums = museums.filter((museum) => {
    const nameMatches = museum.museumName.toLowerCase().includes(searchParam);
    const typeMatches = selectedTypes.includes(museum.type);
    return (searchParam.length === 0 || nameMatches) && typeMatches;
  });

  useEffect(() => {
    if (selectedMarker !== null) {
      setIsSearchBarExpanded(false);
    } else {
      setSearchParam("");
    }
  }, [selectedMarker]);

  const onOptionChange = (e) => {
    if (selectedTypes.includes(e.target.value)) {
      setSelectedTypes(selectedTypes.filter((t) => e.target.value !== t));
    } else {
      setSelectedTypes([...selectedTypes, e.target.value]);
    }
  };

  const toggleSearchBar = () => {
    setIsSearchBarExpanded(!isSearchBarExpanded);
  };

  return (
    <div className="map-container">
      <div
        className={`mapPanel ${
          isSearchBarExpanded && selectedMarker === null ? "expanded" : ""
        }`}
      >
        {selectedMarker === null && (
          <button className="search-btn-map" onClick={toggleSearchBar}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        )}

        {selectedMarker === null && (
          <input
            id="search-museums-bar-map"
            type="text"
            placeholder="Explore Museums"
            onChange={(event) =>
              setSearchParam(event.target.value.toLowerCase())
            }
            className={isSearchBarExpanded ? "expanded" : ""}
          />
        )}

        {selectedMarker === null && isSearchBarExpanded && (
          <div className="filter-buttons-map">
            <input
              type="checkbox"
              id="art"
              value="art"
              checked={selectedTypes.includes("art")}
              onChange={onOptionChange}
            />
            <label htmlFor="art">Art</label>
            <input
              type="checkbox"
              id="academic"
              value="academic"
              checked={selectedTypes.includes("academic")}
              onChange={onOptionChange}
            />
            <label htmlFor="academic">Academic</label>
            <input
              type="checkbox"
              id="other"
              value="other"
              checked={selectedTypes.includes("other")}
              onChange={onOptionChange}
            />
            <label htmlFor="other">Other</label>
          </div>
        )}

        <div className="panel-content">
          <MapPanel
            museums={filteredMuseums}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
          />
        </div>
      </div>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
          options={{ styles: customMapStyle }}
        >
          <MapMarkers
            searchParam={searchParam}
            selectedTypes={selectedTypes}
            setSelectedMarker={setSelectedMarker}
            selectedMarker={selectedMarker}
          />
        </GoogleMap>
      )}
    </div>
  );
};
export default Map;
