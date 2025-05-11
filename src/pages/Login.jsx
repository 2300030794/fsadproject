import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: '1234'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded authentication
    if (credentials.username === 'admin' && credentials.password === '1234') {
      // Simulate successful login
      localStorage.setItem('token', 'dummy-token-1234');
      setIsAuthenticated(true);
      setSuccess('Login successful!');
      setError('');
      setTimeout(() => navigate('/'), 1000);
    } else {
      setError('Invalid username or password');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left"></div>
      <div className="login-right">
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="login-form"
        >
          <h2>Login</h2>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Login</button>
        </motion.form>
      </div>
    </div>
  );
}