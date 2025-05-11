import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-us-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="about-us-content"
      >
        <h1>About Us</h1>
        
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At DonateNow, our mission is simple yet powerful: to make the world a
            better place by supporting those in need. Whether it's through
            providing essential resources, advocating for change, or fostering
            community development, we are committed to creating lasting, positive
            impact. Every donation helps us bring our mission closer to reality.
          </p>
        </section>

        <section className="what-we-do-section">
          <h2>What We Do</h2>
          <p>
            We work across multiple sectors, focusing on causes such as:
          </p>
          <ul>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <strong>Education:</strong> Empowering children and adults through
              access to quality education.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Healthcare:</strong> Providing medical care and supplies to
              underserved communities.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <strong>Environment:</strong> Promoting sustainable practices and
              working to protect the planet for future generations.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <strong>Poverty Alleviation:</strong> Offering food, shelter, and
              employment opportunities to those facing hardship.
            </motion.li>
          </ul>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            {[
              {
                title: "Transparency",
                description:
                  "We believe in honesty and openness about where your donations go.",
              },
              {
                title: "Compassion",
                description:
                  "We treat every individual and community we serve with respect, kindness, and dignity.",
              },
              {
                title: "Collaboration",
                description:
                  "We collaborate with other organizations, governments, and local communities to amplify our efforts.",
              },
              {
                title: "Sustainability",
                description:
                  "Our goal is to empower and build sustainable solutions that have a long-term impact.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="support-section">
          <h2>Why Your Support Matters</h2>
          <p>
            Your donations are more than just financial contributions; they are a
            lifeline to those who need it most. By donating, you help us provide
            food, shelter, education, medical care, and so much more. With your
            help, we can continue to be a beacon of hope for countless
            individuals and families.
          </p>
        </section>

        <section className="join-section">
          <h2>Join Us in Creating a Better Future</h2>
          <p>
            We believe in the power of community and generosity. Every person who
            supports our mission is a part of something bigger than themselves.
            Together, we can make a profound difference and build a world where
            no one is left behind.
          </p>
        </section>

        <section className="get-involved-section">
          <h2>Get Involved</h2>
          <ul>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <strong>Donate Today:</strong> Your generosity fuels our work.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <strong>Volunteer:</strong> Join our efforts on the ground.
            </motion.li>
            <motion.li
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <strong>Spread the Word:</strong> Share our mission with your
              friends and family.
            </motion.li>
          </ul>
          <Link to="/donate-now" className="btn-primary">
            Donate Now
          </Link>
        </section>
      </motion.div>
    </div>
  );
}

export default AboutUsPage;