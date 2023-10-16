import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ closeSidebar }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

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
              onClick={closeSidebar}
              className="nav-anchor"
            >
              Journal
            </Link>
          </li>
          <li>
            <Link
              to="/profile/reviews"
              onClick={closeSidebar}
              className="nav-anchor"
            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              to="/profile/favorites"
              onClick={closeSidebar}
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
