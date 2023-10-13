import React from "react";
import Login from "./Login";
import Register from "./Register";
import "../Users/JournalEntries.css";
import "../Users/JournalEntries.css";

export default function Auth({ token }) {
  return (
    <>
      <div className="auth-container">
        <div className="auth-background">
          <div className="app-description-container">
            <p className="app-description-text">
              Welcome! Join our community of museum enthusiasts as you search,
              review, and rate museums. Save your most cherished experiences
              with your favorite museums and keep a personalized journal of your
              visits, capturing the exhibits that left a lasting impression.
            </p>
          </div>

          {/* <Register token={token} />
          <Login token={token} /> */}
        </div>
      </div>
    </>
  );
}
