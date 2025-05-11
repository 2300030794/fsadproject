import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import PreviousDonationsPage from "./pages/PreviousDonationsPage";
import DonateNowPage from "./pages/DonateNowPage";
import ContactUsPage from "./pages/ContactUsPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <AboutUsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donate-now"
            element={
              <ProtectedRoute>
                <DonateNowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/previous-donations"
            element={
              <ProtectedRoute>
                <PreviousDonationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact-us"
            element={
              <ProtectedRoute>
                <ContactUsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;