import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/authSlice"; // import "./Navbar.css"; // Import your CSS file
import "./Navbar.css"; // Import your CSS file
// import logo from ".././Images/logo.png";
import { resetFavorites } from "../../Redux/favoriteSlice";
import Dropdown from "./Dropdown";

function Navbar({ token }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/register");
    console.log("logout token:", token);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <img src="/Images/logo.png" alt="Logo" className="logo" />
        <img />
        <h1 className="navbar-title">Museum App</h1>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-anchor">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="nav-anchor">
              Map
            </Link>
          </li>
          <li>
            <Link to="/museums" className="nav-anchor">
              Museums
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Dropdown />
              </li>
              <li>
                <button className="auth-btn" onClick={onLogout}>
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="nav-anchor">
                  Register/Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
