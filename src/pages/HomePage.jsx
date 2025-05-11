import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1>Make a Difference Today</h1>
          <p>
            Your contribution helps us create a better world. Every donation, no
            matter how small, counts.
          </p>
          <Link to="/donate-now" className="btn-primary">
            Donate Now
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Who We Are
          </motion.h2>
          <p>
            We are a dedicated group of individuals committed to making positive
            changes in the world. Whether it's providing education, fighting
            hunger, supporting healthcare, or protecting the environment, your
            donations help us reach our goals. Together, we can make an impact
            that lasts.
          </p>
          <Link to="/about" className="btn-secondary">
            Learn More About Our Mission
          </Link>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Your Impact
          </motion.h2>
          <p>Thanks to generous donors like you, we've been able to:</p>
          <div className="impact-grid">
            {[
              {
                title: "10,000+ Meals Provided",
                description: "To those in need.",
              },
              {
                title: "100+ Scholarships Funded",
                description: "For underprivileged children.",
              },
              {
                title: "5,000 Trees Planted",
                description: "To combat deforestation.",
              },
              {
                title: "2,000 Medical Kits Supplied",
                description: "To rural hospitals.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="impact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
          <Link to="/donate-now" className="btn-primary">
            Donate Now
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Current Projects
          </motion.h2>
          <div className="projects-list">
            {[
              {
                title: "Support Children's Education",
                amount: "$5,000 Needed",
              },
              {
                title: "Feed the Homeless",
                amount: "$10,000 Needed",
              },
              {
                title: "Build a Clean Water Facility",
                amount: "$15,000 Needed",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{project.title}</h3>
                <p>{project.amount}</p>
                <Link to="/donate-now" className="btn-secondary">
                  Donate Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Impact Section */}
      <section className="donation-impact-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            How Your Donation Makes a Difference
          </motion.h2>
          <p>
            Every dollar you donate goes directly to supporting our projects.
            Here's how your money helps:
          </p>
          <div className="impact-grid">
            {[
              {
                amount: "$25",
                description: "Provides food for a family of four for a week.",
              },
              {
                amount: "$50",
                description: "Supplies medical aid to 10 individuals in need.",
              },
              {
                amount: "$100",
                description:
                  "Funds one scholarship for a child to attend school for a year.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="impact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{item.amount}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </div>
          <Link to="/donate-now" className="btn-primary">
            Make a Donation Today
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            What Our Donors Say
          </motion.h2>
          <div className="testimonials-grid">
            {[
              {
                quote:
                  "I love knowing that my donation is making a real difference. It's so easy to contribute!",
                author: "John D.",
              },
              {
                quote:
                  "The transparency and impact of this charity inspire me to give more.",
                author: "Sarah M.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p>"{testimonial.quote}"</p>
                <p className="author">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;