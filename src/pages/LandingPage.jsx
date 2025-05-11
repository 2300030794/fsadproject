import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/home");
  }

  return (
    <div className="landing-container">
      <div className="landing-left">
        <div className="quote-box">
          <h1>"Small acts, when multiplied by millions, can transform the world."</h1>
          <p>- Howard Zinn</p>
        </div>
      </div>
      <div className="landing-right">
        <div className="auth-box">
          <h2>Welcome to DonateCare</h2>
          <p>Join us in making a difference today</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;