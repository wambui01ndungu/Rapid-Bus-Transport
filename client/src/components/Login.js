import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(true);  // Control visibility of the login form

  const handlePassWordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to close the login form
  const handleClose = () => {
    setIsVisible(false);  // Hides the form when the close button is clicked
  };

  // If isVisible is false, return null to render nothing
  if (!isVisible) {
    return null;
  }

  return (
    <div className="login-container">
      {/* Close button */}
      <button className="close-button" onClick={handleClose}>✖️</button>
      
      {/* Form Container */}
      <div className="login-form-container">
        <h3>Welcome back!</h3>
        <p>Log into your account</p>
        
        <form className="login-form">
          {/* Email Input */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              required
              className="login-input"
            />
          </div>
          
          {/* Password Input */}
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePassWordChange}
              className="login-input"
              required
            />
          </div>
          
          {/* Login Button */}
          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Footer with Links */}
        <div className="login-footer">
          <p className="forgotpassword">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          
          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;