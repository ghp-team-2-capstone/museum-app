import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectIsLoggedIn } from "../../Redux/authSlice";
import "./Navbar.css";
import logo from ".././images/logo.png";
import { resetFavorites } from "../../Redux/favoriteSlice";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar({ token }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/login");
    console.log("logout token:", token);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="top-nav">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
          <h1 className="navbar-title">aMUSE</h1>
          <button className="menu-button" onClick={() => toggleSidebar()}>
            {showSidebar ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
        </div>
        <div className="side-navbar">
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
            {isLoggedIn ? (
              <>
                <li>
                  <Dropdown />
                </li>
                <div className="logout-container">
                  <button className="auth-btn" onClick={onLogout}>
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav-anchor">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {showSidebar && (
        <div className="sidebar active">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-anchor" onClick={closeSidebar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/map" className="nav-anchor" onClick={closeSidebar}>
                Map
              </Link>
            </li>
            <li>
              <Link to="/museums" className="nav-anchor" onClick={closeSidebar}>
                Museums
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Dropdown closeSidebar={closeSidebar} />
                </li>
                <div className="logout-container">
                  <button className="auth-btn" onClick={onLogout}>
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <li>
                <Link to="/login" className="nav-anchor" onClick={closeSidebar}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
