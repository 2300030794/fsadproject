import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/donate-now", label: "Donate" },
    { to: "/previous-donations", label: "History" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/login", label: "Logout", onClick: handleLogout },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          DonateCare 🌟
        </Link>
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="nav-link"
                onClick={() => {
                  setIsOpen(false);
                  if (link.onClick) link.onClick();
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}