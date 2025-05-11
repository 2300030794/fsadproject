import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ContactUsPage.css";

function ContactUsPage() {
  const contactDetails = [
    {
      type: "Phone",
      value: "9876543210",
      link: "tel:9876543210",
      emoji: "📞",
      description: "Call us anytime to learn more about our initiatives or how you can help.",
    },
    {
      type: "Email",
      value: "donatecare@gmail.com",
      link: "mailto:donatecare@gmail.com",
      emoji: "📧",
      description: "Reach out via email for inquiries, partnerships, or support.",
    },
    {
      type: "Location",
      value: "klu vaddeswaram",
      link: null,
      emoji: "📍",
      description: "Visit our office or support our work in slum areas like Green Valley and Riverbank.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess("Message sent successfully! 🤝");
        setFormData({ name: "", email: "", message: "" });
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to send message");
        setSuccess("");
      }
    } catch (error) {
      setError("Network error: " + error.message);
      setSuccess("");
    }
  };

  return (
    <div className="contact-us-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="contact-us-content"
      >
        <h1>Contact Us 🤝</h1>
        <p className="subtitle">
          We're here to answer your questions and collaborate for a better world! 😊 Reach out via phone, email, or the form below.
        </p>

        <section className="contact-details">
          <h2>Get in Touch 🌍</h2>
          <div className="contact-grid">
            {contactDetails.map((detail, index) => (
              <motion.div
                key={detail.type}
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>
                  {detail.emoji} {detail.type}
                </h3>
                <p className="value">
                  {detail.link ? (
                    <a href={detail.link} className="contact-link">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </p>
                <p className="description">{detail.description}</p>
                {detail.link && (
                  <a href={detail.link} className="btn-primary">
                    {detail.type === "Phone" ? "Call Now" : "Send Email"}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </section>

        <div className="call-to-action">
          <h2>Join Our Mission 🌟</h2>
          <p>
            Your support transforms lives in communities like Green Valley and Hope Colony. Contact us or donate today!
          </p>
          <Link to="/donate-now" className="btn-primary">
            Donate Now
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ContactUsPage;