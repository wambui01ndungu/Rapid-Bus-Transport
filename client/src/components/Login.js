import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState(null); // State for user role
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_role", data.role);
            localStorage.setItem("username", data.name || "User");

            setUserRole(data.role); 
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message || "Server error. Please try again.");
        }
    };

    useEffect(() => {
        if (userRole) { 
            const storedRole = localStorage.getItem("user_role"); 

            if (storedRole && storedRole.toLowerCase() === "driver") { // Lowercase comparison
                navigate("/driver-dashboard");
            } else if (storedRole && storedRole.toLowerCase() === "admin") { // Lowercase comparison
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [userRole, navigate]); // userRole and navigate are dependencies

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h3>Welcome back!</h3>
                <p>Log into your account</p>

                {error && <p className="error-message">{error}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="login-input"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </p>
                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;