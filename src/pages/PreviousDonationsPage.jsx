import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./PreviousDonationsPage.css";

function PreviousDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");

  // Mock data for family stories
  const familyStories = [
    {
      familyName: "The Smith Family",
      story: "Thanks to your donations, the Smith family received clothing and food supplies, helping them through a tough winter.",
    },
    {
      familyName: "The Garcia Family",
      story: "Your contributions funded a scholarship for the Garcia children, enabling them to attend school and pursue their dreams.",
    },
    {
      familyName: "The Patel Family",
      story: "With your support, the Patel family gained access to medical care, improving their health and quality of life.",
    },
  ];

  // Mock data for slum areas
  const slumAreas = [
    {
      name: "Green Valley Slum",
      details: "Installed clean water facilities, benefiting 200 residents.",
    },
    {
      name: "Riverbank Settlement",
      details: "Built a community school for 50 children.",
    },
    {
      name: "Sunrise Slum",
      details: "Provided medical camps, serving 150 families.",
    },
    {
      name: "Hope Colony",
      details: "Supplied solar lighting for safer nights.",
    },
    {
      name: "Unity Slum",
      details: "Funded vocational training for 30 women.",
    },
  ];

  // State for animated counters
  const [donationsCount, setDonationsCount] = useState(0);
  const [slumAreasCount, setSlumAreasCount] = useState(0);
  const [donorsCount, setDonorsCount] = useState(0);

  // Target values for counters
  const targetDonations = 10;
  const targetSlumAreas = 5;
  const targetDonors = 100;

  // State for family stories carousel
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // Fetch donations from backend
  useEffect(() => {
    fetch("http://localhost:8081/api/donations")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch donations");
        return response.json();
      })
      .then((data) => setDonations(data))
      .catch((error) => setError("Error fetching donations: " + error.message));
  }, []);

  // Animation logic for counters
  useEffect(() => {
    const animateCounter = (setCount, target, duration) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 50);
      return () => clearInterval(timer);
    };

    animateCounter(setDonationsCount, targetDonations, 2000);
    animateCounter(setSlumAreasCount, targetSlumAreas, 2000);
    animateCounter(setDonorsCount, targetDonors, 2000);
  }, []);

  // Carousel logic for family stories
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % familyStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [familyStories.length]);

  return (
    <div className="previous-donations-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="previous-donations-content"
      >
        <h1>Your Previous Donations</h1>
        <p className="subtitle">
          Thank you for your generosity! Below is a summary of your past
          contributions and the impact they've made.
        </p>

        {error && <p className="error">{error}</p>}

        <section className="history-section">
          <h2>Our Impact Till Date</h2>
          <div className="history-grid">
            <div className="history-card">
              <h3>{donationsCount}</h3>
              <p>Donations Made</p>
            </div>
            <div className="history-card">
              <h3>{slumAreasCount}</h3>
              <p>Slum Areas Impacted</p>
            </div>
            <div className="history-card">
              <h3>{donorsCount}</h3>
              <p>Trusted Donors</p>
            </div>
          </div>

          <div className="slum-areas">
            <h3>Impacted Slum Areas</h3>
            <div className="slum-areas-list">
              {slumAreas.map((area, index) => (
                <motion.div
                  key={index}
                  className="slum-area-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4>{area.name}</h4>
                  <p>{area.details}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="family-stories">
            <h3>Family Stories</h3>
            <motion.div
              key={currentStoryIndex}
              className="story-box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4>{familyStories[currentStoryIndex].familyName}</h4>
              <p>{familyStories[currentStoryIndex].story}</p>
            </motion.div>
          </div>
        </section>

        <div className="donations-grid">
          {donations.map((donation) => (
            <motion.div
              key={donation.id}
              className="donation-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: donation.id * 0.1 }}
            >
              <h2>{donation.type}</h2>
              <p className="description">{donation.description}</p>
              <p className="total-donations">
                Quantity: {donation.quantity} | Total: ${donation.totalAmount}
              </p>
              <p className="total-donations">Date: {donation.donationDate}</p>
              <div className="impact-section">
                <h3>Impact</h3>
                <ul>
                  {JSON.parse(donation.impact).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="call-to-action">
          <h2>Continue Making a Difference</h2>
          <p>
            Your donations change lives. Make another contribution today to
            support our ongoing projects.
          </p>
          <Link to="/donate-now" className="btn-primary">
            Donate Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default PreviousDonationsPage;