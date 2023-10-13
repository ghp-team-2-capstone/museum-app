import React, { useState, useEffect } from "react";
import { fetchAllMuseums } from "../../helpers/fetching";
import "./AllMuseums.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../Loading/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function GetAllMuseums() {
  const [museums, setMuseums] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const renderMuseums = async () => {
      try {
        const museumArray = await fetchAllMuseums();
        setMuseums(museumArray);
      } catch (error) {
        setError("Failed to fetch museums. Please try again later.");
      }
    };
    renderMuseums();
  }, []);

  const searchedMuseumsPage = searchParam
    ? museums.filter((museum) =>
        museum.museumName.toLowerCase().includes(searchParam.toLowerCase())
      )
    : museums;

  const toggleSearchBar = () => {
    setIsSearchBarExpanded(!isSearchBarExpanded);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Browse Museums</h1>
      </div>
      <div className="search-museums-container">
        <button className="search-btn-museums" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} />
        </button>

        <label className="search-museums-bar">
          <input
            id="search-museums-bar"
            type="text"
            placeholder="Explore Museums"
            onChange={(event) =>
              setSearchParam(event.target.value.toLowerCase())
            }
            className={isSearchBarExpanded ? "expanded" : ""}
          />
        </label>
      </div>
      {searchedMuseumsPage.length === 0 ? (
        <Spinner />
      ) : (
        <div className="all-museums-container">
          {searchedMuseumsPage.map((museum) => (
            <div key={museum.museumName} className="museum-item">
              <h2 className="museum-headers">{museum.museumName}</h2>
              <div className="image-and-text">
                <img
                  src={museum.image}
                  alt={museum.museumName}
                  className="museum-image"
                />
                <p className="museum-description">{museum.description}</p>
              </div>
              <div className="button-container">
                <button
                  className="details-button"
                  onClick={() => {
                    navigate(`/museums/${museum.museumId}`);
                  }}
                >
                  See Details
                </button>
                <a
                  href={museum.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more-button"
                >
                  Museum Website
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import { fetchAllMuseums } from "../../helpers/fetching";
// import "./AllMuseums.css";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../Loading/Spinner";

// export default function GetAllMuseums() {
//   const [museums, setMuseums] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchParam, setSearchParam] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const renderMuseums = async () => {
//       try {
//         const museumArray = await fetchAllMuseums();
//         console.log("Museum Array: ", museumArray);
//         setMuseums(museumArray);
//       } catch (error) {
//         setError("Failed to fetch museums. Please try again later.");
//       }
//     };
//     renderMuseums();
//   }, []);

//   const searchedMuseumsPage = searchParam
//     ? museums.filter((museum) =>
//         museum.museumName.toLowerCase().includes(searchParam.toLowerCase())
//       )
//     : museums;

//   console.log("Search Param: ", searchParam);
//   console.log("Filtered Museums: ", searchedMuseumsPage);

//   return (
//     <div>
//       <h1>All Museums</h1>

//       <label>
//         <h4 className="search-filter-header"> Search:</h4>
//         <br />
//         <input
//           id="search-museums-bar"
//           type="text"
//           placeholder="search museums"
//           onChange={(event) => setSearchParam(event.target.value.toLowerCase())}
//         />
//       </label>

//       {searchedMuseumsPage.length === 0 ? (
//         <Spinner />
//       ) : (
//         <div className="all-museums">
//           {searchedMuseumsPage.map((museum) => (
//             <div key={museum.museumName} className="museum-item">
//               <h2>{museum.museumName}</h2>
//               <img
//                 src={museum.image}
//                 alt={museum.museumName}
//                 className="museum-image"
//               />
//               <p>{museum.description}</p>

//               <a href={museum.link} target="_blank" rel="noopener noreferrer">
//                 Learn More at Museum Website
//               </a>
//               <button
//                 className="detailsButton"
//                 onClick={() => {
//                   navigate(`/museums/${museum.museumId}`);
//                 }}
//               >
//                 See Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
