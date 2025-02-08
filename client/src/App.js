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
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Retrieve username
  const userRole = localStorage.getItem("user_role");


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
              <button onClick={() => openModal("About Us", <>`Rapid Bus Transport is committed to providing safe, reliable, and affordable transportation for students and daily commuters. <dr/>Our fleet is equipped with modern amenities, ensuring a comfortable journey.<br/> Our mission is to revolutionize public transport by integrating technology, enhancing user experience, and promoting efficiency.`</>)} className="nav-link">About Us</button>
            </li>
            <li>
            <button 
  onClick={() => openModal(
    "Contact Us", 
    <>
      📍 Headquarters: Nairobi, Kenya <br />
      📞 Phone: +254 700 123 456 <br />
      📧 Email: support@rapidbustransport.com <br />
      🌍 Website: https://rapid-bus-transport.vercel.app/www.rapidbustransport.com <br /><br />
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
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
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