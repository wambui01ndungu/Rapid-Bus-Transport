import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa"; // Import person icon
import "./App.css"; 
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SignupForm from "./components/SignupForm";
import Login from "./components/Login";
import DriverDashboard from "./components/DriverDashboard";
import BusSchedule from "./components/BusSchedule";
import UserDashboard from "./components/UserDashboard";
import CompanyAbout from "./components/CompanyAbout";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token")); // Make token reactive
    const [username, setUsername] = useState(localStorage.getItem("username")); // Make username reactive
    const [userRole, setUserRole] = useState(localStorage.getItem("user_role")); // Make userRole reactive
    

    useEffect(() => {
        // This effect will run whenever localStorage changes (including when set in Login)
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
            setUsername(localStorage.getItem("username"));
            setUserRole(localStorage.getItem("user_role"));
        };

        window.addEventListener('storage', handleStorageChange); // Listen for storage changes

        // Initial check in case values are already in localStorage on page load
        handleStorageChange();

        return () => { // Clean up the listener when the component unmounts
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this runs only once on mount and unmount


  const [modalContent, setModalContent] = useState(null);

  const openModal = (title, content) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_role");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="App">
      <header>
        <nav>
          <ul className="nav-left">
          <img src="/logo.jpg" alt="Logo" className="logo" />
      
            <li><Link to="/">Home</Link></li>
            <li><Link to="/schedules"> Bus Schedule</Link></li>
            {token && <li><Link to="/bookings">My Bookings</Link></li>}
            <li>
              <button onClick={() => openModal("About Us", <>`Safiri Link is committed to providing safe, reliable, and affordable transportation for students and daily commuters. <dr/>Our fleet is equipped with modern amenities, ensuring a comfortable journey.<br/> Our mission is to revolutionize public transport by integrating technology, enhancing user experience, and promoting efficiency.`</>)} className="nav-link">About Us</button>
            </li>
            <li>
            <button 
  onClick={() => openModal(
    "Contact Us", 
    <>
      📍 Headquarters: Nairobi, Kenya <br />
      📞 Phone: +254 700 123 456 <br />
      📧 Email: support@safirilink.com <br />
      🌍 Website: www.safirilink.com <br /><br />
      Our support team is available 24/7 to assist you.
    </>
  )} 
  className="nav-link"
>
  Contact Us
</button>

   
            </li>
          </ul>

          {token && (
            <ul className="nav-right">
              <li className="welcome-message">
                <FaUser className="user-icon" /> Welcome, {username}
              </li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </ul>
          )}

          {!token && (
            <ul className="nav-right">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
            </ul>
          )}
       </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedules" element={<BusSchedule />} />
          <Route path="/bookings" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/driver-dashboard"
            element={
              <ProtectedRoute requiredRole="Driver" userRole={userRole}>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin" userRole={userRole}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>  

      <footer>
        <p>&copy; 2025 Bus Management System. All rights reserved.</p>
      </footer>
      {modalContent && <CompanyAbout title={modalContent.title} content={modalContent.content} onClose={closeModal} />}
    
    </div>
  );
}

export default App;