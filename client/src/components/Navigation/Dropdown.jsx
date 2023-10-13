import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div className="dropdown">
      <button onClick={handleOpen} className="nav-anchor">
        {!open ? <>My Profile +</> : <>My Profile -</>}
      </button>

      {open && (
        <ul className="dropdown-links">
          <li>
            <Link
              to="/profile/journal"
              // onClick={handleClose}
              className="nav-anchor"
            >
              Journal
            </Link>
          </li>
          <li>
            <Link
              to="/profile/reviews"
              // onClick={handleClose}
              className="nav-anchor"
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              to="/profile/favorites"
              // onClick={handleClose}
              className="nav-anchor"
            >
              Favorites
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
