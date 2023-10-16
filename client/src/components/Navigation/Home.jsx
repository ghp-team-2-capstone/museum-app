import React from "react";
import { useNavigate } from "react-router-dom";
import homeVideo from "../Images/homepage.mp4";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={homeVideo} type="video/mp4" />
        </video>
      </div>

      <h1 className="quote">
        “A visit to a museum is a search for beauty, truth, and meaning in our
        lives. Go to museums as often as you can.” – Maira Kalman
      </h1>

      <button
        onClick={() => {
          navigate("/register");
        }}
        className="home-btn"
      >
        <span>New here? Create an account!</span>
      </button>
    </div>
  );
}
