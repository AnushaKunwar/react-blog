import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { logout } from "./../../../helper/auth";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="link-wrapper">
          <Link to="/admin/blogs" className="nav-link">
            Blogs
          </Link>
          <Link to="/admin/tags" className="nav-link">
            Tags
          </Link>
          <p className="nav-link" onClick={logout}>
            Logout
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
