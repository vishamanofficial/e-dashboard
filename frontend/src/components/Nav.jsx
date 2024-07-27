import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const navStyle = {
    backgroundColor: "#343a40",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };

  const ulStyle = {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  };

  const liStyle = {
    margin: "0 1rem",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
  };

  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav style={navStyle}>
      <div style={{ color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold", display:'flex', alignItems:"center" }}>
        <img style={{width:"45px", marginRight:"10px"}} src="https://vishamanofficial-portfolio.vercel.app/images/aman.png" alt="logo" />
        E-Commerce Dashboard
      </div>
      {auth ? (
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>
              Products
            </Link>
          </li>
          <li style={liStyle}>
            <Link to="/add" style={linkStyle}>
              Add Products
            </Link>
          </li>
          {/* <li style={liStyle}>
            <Link to="/update" style={linkStyle}>
              Update Products
            </Link>
          </li> */}
          {/* <li style={liStyle}>
            <Link to="/profile" style={linkStyle}>
              Profile
            </Link>
          </li> */}
          <li>
            <Link
              onClick={logout}
              to="/signup"
              style={linkStyle}
              className="button-link"
            >
              Logout {" "}
              {
                localStorage.getItem("user")
                 ? JSON.parse(localStorage.getItem("user")).name
                  : ""
              }
            </Link>
          </li>
        </ul>
      ) : (
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/signup" style={linkStyle} className="button-link">
              Sign Up
            </Link>
          </li>
          <li style={liStyle}>
            <Link to="/login" style={linkStyle} className="button-link">
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
