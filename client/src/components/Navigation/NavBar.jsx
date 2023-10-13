import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectIsLoggedIn } from "../../Redux/authSlice"; //
import "./Navbar.css"; // Import your CSS file
// import logo from ".././Images/logo.png";
import { resetFavorites } from "../../Redux/favoriteSlice";
import Dropdown from "./Dropdown";

function Navbar({ token }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onLogout = () => {
    dispatch(logOut());
    dispatch(resetFavorites());
    navigate("/login");
    console.log("logout token:", token);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <img
          src="/Images/logo.png"
          alt="Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <img />
        <h1 className="navbar-title">aMUSE</h1>
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
          {/* {token ? ( */}
          {isLoggedIn ? (
            <>
              <li>
                <Dropdown />
              </li>
              {/* <li> */}
              <div className="logout-container">
                <button className="auth-btn" onClick={onLogout}>
                  Log Out
                </button>
              </div>
              {/* </li> */}
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-anchor">
                  Login
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
