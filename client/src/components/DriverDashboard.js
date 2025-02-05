import React, { useState } from "react";
import { FaHome, FaBus, FaUserCircle, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import "./DriverDashboard.css";

function DriverDashboard() {
  // Driver's personal details (initial values)
  const [driverDetails, setDriverDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    license: "ABC1234567",
    email: "johndoe@example.com",
    phone: "+254712345678",
  });

  // State to manage active tab
  const [activeTab, setActiveTab] = useState("home");

  // State for trips
  const [trips, setTrips] = useState([
    { id: 1, date: "15/05/2023", departure: "Nairobi", arrival: "Mombasa" },
    { id: 2, date: "16/9/2024", departure: "Kisumu", arrival: "Thika" },
  ]);
  const [newTrip, setNewTrip] = useState({ date: "", departure: "", arrival: "" });

  // State for messages
  const [messages, setMessages] = useState([
    { id: 1, sender: "Admin", text: "Your next trip is scheduled for tomorrow." },
    { id: 2, sender: "HR", text: "Reminder: Please submit your trip reports." }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // State for duty status
  const [dutyStatus, setDutyStatus] = useState([
    { id: 1, date: "2025-01-27", status: "On Duty" },
    { id: 2, date: "2025-01-26", status: "Off Duty" },
  ]);
  const [newDutyStatus, setNewDutyStatus] = useState({ date: "", status: "" });

  // Handle changing driver details
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle submitting the updated profile
  const handleProfileSubmit = () => {
    alert("Profile updated successfully!");
    setActiveTab("home"); // After submitting, go back to the home page
  };

  // Handle adding new trip
  const handleTripChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  const handleAddTrip = () => {
    if (newTrip.date && newTrip.departure && newTrip.arrival) {
      setTrips([...trips, { id: trips.length + 1, ...newTrip }]);
      setNewTrip({ date: "", departure: "", arrival: "" });
    } else {
      alert("Please fill all fields before adding a trip.");
    }
  };

  // Handle message sending
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, sender: "You", text: newMessage }]);
      setNewMessage(""); // Clear input field
    } else {
      alert("Message cannot be empty.");
    }
  };

  // Handle adding new duty status
  const handleDutyStatusChange = (e) => {
    const { name, value } = e.target;
    setNewDutyStatus({ ...newDutyStatus, [name]: value });
  };

  const handleAddDutyStatus = () => {
    if (newDutyStatus.date && newDutyStatus.status) {
      setDutyStatus([...dutyStatus, { id: dutyStatus.length + 1, ...newDutyStatus }]);
      setNewDutyStatus({ date: "", status: "" });
    } else {
      alert("Please fill all fields before adding a duty status.");
    }
  };

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Render Messages section
  const renderMessage = () => (
    <div>
      <h3>Messages</h3>
      <div className="message-container">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="send-message-section">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );

  // Render Home section
  const renderHomeContent = () => (
    <div>
      <h2>Welcome to the Driver Dashboard</h2>
      <div className="driver-details">
        <h3>Personal Details</h3>
        <p><strong>Name:</strong> {driverDetails.firstName} {driverDetails.lastName}</p>
        <p><strong>License:</strong> {driverDetails.license}</p>
        <p><strong>Email:</strong> {driverDetails.email}</p>
        <p><strong>Phone:</strong> {driverDetails.phone}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="drivers-action-buttons">
        <button className="cancel-route-btn" onClick={() => alert("Requesting Route Cancellation")}>
          Request Route Cancellation
        </button>
        <button className="contact-admin-btn" onClick={() => alert("Contacting Admin")}>
          Contact Admin
        </button>
      </div>

      <button onClick={() => handleTabClick("updateProfile")}>Update Profile</button>
    </div>
  );

  const renderDutyStatus = () => (
    <div>
      <h3>Duty Status</h3>
      <table className="drivers-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dutyStatus.map((status) => (
            <tr key={status.id}>
              <td>{status.id}</td>
              <td>{status.date}</td>
              <td>{status.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add a New Duty Status</h3>
      <div className="add-duty-status-section">
        <input
          type="text"
          name="date"
          value={newDutyStatus.date}
          onChange={handleDutyStatusChange}
          placeholder="Enter Date"
        />
        <select
          name="status"
          value={newDutyStatus.status}
          onChange={handleDutyStatusChange}
        >
          <option value="">Select Status</option>
          <option value="On Duty">On Duty</option>
          <option value="Off Duty">Off Duty</option>
        </select>
        <button onClick={handleAddDutyStatus}>Add Duty Status</button>
      </div>
    </div>
  );

  const renderUpdateProfile = () => (
    <div>
      <h3>Update Your Profile</h3>
      <div className="update-profile-section">
        <input
          type="text"
          name="firstName"
          value={driverDetails.firstName}
          onChange={handleProfileChange}
          placeholder="Enter First Name"
        />
        <input
          type="text"
          name="lastName"
          value={driverDetails.lastName}
          onChange={handleProfileChange}
          placeholder="Enter Last Name"
        />
        <input
          type="text"
          name="license"
          value={driverDetails.license}
          onChange={handleProfileChange}
          placeholder="Enter License Number"
        />
        <input
          type="email"
          name="email"
          value={driverDetails.email}
          onChange={handleProfileChange}
          placeholder="Enter Email"
        />
        <input
          type="text"
          name="phone"
          value={driverDetails.phone}
          onChange={handleProfileChange}
          placeholder="Enter Phone Number"
        />
        <button onClick={handleProfileSubmit}>Submit</button>
      </div>
    </div>
  );

  const renderShowTrips = () => (
    <div>
      <h3>Trips Record</h3>
      <table className="drivers-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Departure</th>
            <th>Arrival</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.date}</td>
              <td>{trip.departure}</td>
              <td>{trip.arrival}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add a New Trip</h3>
      <div className="add-trip-section">
        <input
          type="text"
          name="departure"
          value={newTrip.departure}
          onChange={handleTripChange}
          placeholder="Enter Departure"
        />
        <input
          type="text"
          name="arrival"
          value={newTrip.arrival}
          onChange={handleTripChange}
          placeholder="Enter Arrival"
        />
        <input
          type="date"
          name="date"
          value={newTrip.date}
          onChange={handleTripChange}
        />
        <button onClick={handleAddTrip}>Add New Trip</button>
      </div>
    </div>
  );

  return (
    <div className="drivers-dashboard-container">
      {/* Sidebar Navigation */}
      <div className="drivers-sidebar">
        {/* Arrow Left Icon */}
        <div className="arrow-left">
          <FaArrowLeft className="arrow-icon" onClick={() => handleTabClick("home")} />
        </div>
            
        <ul>
          <li onClick={() => handleTabClick("home")}><FaHome /> Home</li>
          <li onClick={() => handleTabClick("showTrips")}><FaBus /> Show Trips</li>
          <li onClick={() => handleTabClick("updateProfile")}><FaUserCircle /> Profile</li>
          <li onClick={() => handleTabClick("dutyStatus")}><FaUserCircle /> Duty Status</li>
          <li onClick={() => handleTabClick("messages")}><FaEnvelope/>Message</li>
        </ul>
        </div>



      {/* Main Section: Topbar + Dashboard Content */}
      <div className="drivers-main-content">
        {/* Topbar Section */}
        <div className="drivers-topbar">
          <h1 className="company-name">Safari Link</h1>
          <input type="text" placeholder="Search..." className="search-bar" />
          <div className="profile-container">
            <FaUserCircle className="driver-icon" />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="drivers-dashboard-content">
          <h2>Welcome, {driverDetails.firstName}!</h2>

          {/* Render content based on activeTab */}
          {activeTab === "home" && renderHomeContent()}
          {activeTab === "updateProfile" && renderUpdateProfile()}
          {activeTab === "showTrips" && renderShowTrips()}
          {activeTab === "messages" && renderMessage()}
          {activeTab === "dutyStatus" && renderDutyStatus()}
        </div>
      </div>
    </div>
  );
}

export default DriverDashboard;