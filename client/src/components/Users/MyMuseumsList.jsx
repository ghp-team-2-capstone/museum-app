import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../Redux/favoriteSlice";
import { fetchAllMuseums } from "../../helpers/fetching";
import "./JournalEntries.css";
import FavoriteMuseum from "../Museums/FavoriteMuseum";

export default function MyMuseumsList({ userId, token }) {
  const favoriteMuseums = useSelector(selectFavorites);
  const navigate = useNavigate();
  console.log("favorite museums:", favoriteMuseums);

  const [favoriteMuseumsData, setFavoriteMuseumsData] = useState([]);

  useEffect(() => {
    async function fetchFavoriteMuseumsData() {
      const allMuseums = await fetchAllMuseums();
      const filteredMuseums = allMuseums.filter((museum) =>
        favoriteMuseums.some(
          (favorite) => favorite.museumId === museum.museumId
        )
      );

      setFavoriteMuseumsData(filteredMuseums);
    }

    fetchFavoriteMuseumsData();
  }, [favoriteMuseums]);

  return (
    <>
      <div className="page-header-favorite-museums">
        <h1>My Favorite Museums</h1>
      </div>
      <div className="favorites-container">
        {/* <h1 className="favorite-title">My Favorite Museums</h1> */}
        {favoriteMuseumsData.length === 0 ? (
          <div className="empty-favorites-page">
            <p className="empty-favorites-title">No favorite museums yet.</p>
            <button
              className="favorites-museum-btn"
              onClick={() => {
                navigate("/museums");
              }}
            >
              Browse Museums
            </button>
          </div>
        ) : (
          <ul>
            {favoriteMuseumsData.map((museum) => (
              <div className="favorites-card" key={museum.museumId}>
                <div className="flex items-center justify-center">
                  {token && (
                    <FavoriteMuseum
                      userId={userId}
                      museumId={museum.museumId}
                      token={token}
                    />
                  )}
                </div>
                <h2 className="fav-museum-name">{museum.museumName}</h2>
                <img className="museum-img" src={museum.image} />
                <p>{museum.description}</p>
                <button
                  className="favorite-detail-btn"
                  onClick={() => {
                    navigate(`/museums/${museum.museumId}`);
                  }}
                >
                  See Details
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
