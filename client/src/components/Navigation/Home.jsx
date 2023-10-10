import React from "react";
// import homeVideo from "../Images/homepage.mp4";

export default function Home() {
  return (
    <div className="home">
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="/Images/homepage.mp4" type="video/mp4" />
        </video>
      </div>

      <h1 className="quote">
        “A visit to a museum is a search for beauty, truth, and meaning in our
        lives. Go to museums as often as you can.” – Maira Kalman
      </h1>
    </div>
  );
}
