import React, { useState } from "react";
import { FaCalendarCheck } from 'react-icons/fa';
import { FaHome, FaBus, FaUserCircle, FaArrowLeft, FaEnvelope ,} from "react-icons/fa";
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

  // State for update schedule
  const [updateSchedules, setUpdateSchedules] = useState([
    { id: 1, busNumber:"50", date: "15/07/2023", route: "Mombasa - Nairobi", departureTime: "07:02 pm", departureArea: "Mombasa", destination: "Nairobi", availableSeats: "30", price: "3000" },
  ]);
  const [newUpdateSchedule, setNewUpdateSchedule] = useState({ date: "", route: "", departureTime: "", departureArea: "", destination: "", availableSeats: "", price: "" });


  


  


  // State for duty status
  const [dutyStatus, setDutyStatus] = useState([
    { id: 1, date: "2025-01-27", status: "On Duty" },
    { id: 2, date: "2025-01-26", status: "Off Duty" },
  ]);
  const [newDutyStatus, setNewDutyStatus] = useState({ date: "", status: "" });

  // Handle changing driver details
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setDriverDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleProfileSubmit = () => {
    alert("Profile updated successfully!");
    setActiveTab("home"); // Go back to the home page after submitting
  };
  const renderUpdateProfile = () => (
    <div className="update-profile-container">
      <h3>Update Profile</h3>
      <div className="profile-form">
        <label>First Name:</label>
        <input type="text" name="firstName" value={driverDetails.firstName} onChange={handleProfileChange} />
  
        <label>Last Name:</label>
        <input type="text" name="lastName" value={driverDetails.lastName} onChange={handleProfileChange} />
  
        <label>License:</label>
        <input type="text" name="license" value={driverDetails.license} onChange={handleProfileChange} />
  
        <label>Email:</label>
        <input type="email" name="email" value={driverDetails.email} onChange={handleProfileChange} />
  
        <label>Phone:</label>
        <input type="text" name="phone" value={driverDetails.phone} onChange={handleProfileChange} />
  
        <button onClick={handleProfileSubmit}>Save Changes</button>
      </div>
    </div>
  );
  

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

  // Handle adding a new bus schedule
  const handleUpdateScheduleChange = (e) => {
    const { name, value } = e.target;
    setNewUpdateSchedule({ ...newUpdateSchedule, [name]: value });
  };

  const handleAddUpdateSchedule = () => {
    if (newUpdateSchedule.busNumber && newUpdateSchedule.date && newUpdateSchedule.route && newUpdateSchedule.departureTime && newUpdateSchedule.departureArea && newUpdateSchedule.destination && newUpdateSchedule.availableSeats && newUpdateSchedule.price) {
      setUpdateSchedules([...updateSchedules, { id: updateSchedules.length + 1, ...newUpdateSchedule }]);
      setNewUpdateSchedule({busNumber:"", date: "", route: "", departureTime: "", departureArea: "", destination: "", availableSeats: "", price: "" });
    } else {
      alert("Please fill all fields before adding a schedule.");
    }
  };
  const [recipient, setRecipient] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

const handleSendMessage = () => {
  if (!recipient.trim() || !newMessage.trim()) {
    alert("Please enter a recipient and a message.");
    return;
  }

  const newMsg = {
    id: messages.length + 1,
    recipient, // Add recipient
    sender: "You", // You can adjust this dynamically
    text: newMessage,
  };

  setMessages([...messages, newMsg]);
  setRecipient(""); // Clear recipient field
  setNewMessage(""); // Clear message field
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
        <button onClick={() => handleTabClick("messages")}>Request Route Cancellation</button>
        <button onClick={() => handleTabClick("messages")}>Contact Admin</button>
      </div>
      <button onClick={() => handleTabClick("updateProfile")}>Update Profile</button>
    </div>
  );

  // Render Update Profile section
  <div className="driver-profile">
  <h3 className="profile-title">Driver Profile</h3>
  <div className="profile-card">
    <div className="profile-avatar">
      <FaUserCircle size={80} />
    </div>
    <div className="profile-info">
      <p><strong>Name:</strong> {driverDetails.firstName} {driverDetails.lastName}</p>
      <p><strong>License:</strong> {driverDetails.license}</p>
      <p><strong>Email:</strong> {driverDetails.email}</p>
      <p><strong>Phone:</strong> {driverDetails.phone}</p>
    </div>
  </div>
  <div className="profile-buttons">
    <button onClick={() => alert("Requesting Route Cancellation")}>Request Route Cancellation</button>
    <button onClick={() => alert("Contacting Admin")}>Contact Admin</button>
    <button onClick={() => handleTabClick("updateProfile")}>Update Profile</button>
  </div>
</div>

  const renderShowTrips = () => (
    <div className="trips-container">
      <h3>Trips Record</h3>
      
      <div className="trips-table-container">
        <table>
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
      </div>
  
      <div className="add-trip-form">
        <h4>Add a New Trip</h4>
        <div className="input-fields">
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
        </div>
        <button className="add-trip-button" onClick={handleAddTrip}>
          Add New Trip
        </button>
      </div>
    </div>
  );
  const renderDutyStatus = () => (
    <div className="duty-status-container">
      <h3 className="duty-status-title">Duty Status</h3>
      <div className="table-container">
        <table className="duty-status-table">
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
                <td className={status.status === "On Duty" ? "on-duty" : "off-duty"}>
                  {status.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <h3 className="add-duty-title">Add Duty Status</h3>
      <div className="add-duty-container">
        <input
          type="date"
          name="date"
          value={newDutyStatus.date}
          onChange={handleDutyStatusChange}
          className="duty-input"
        />
        <select
          name="status"
          value={newDutyStatus.status}
          onChange={handleDutyStatusChange}
          className="duty-select"
        >
          <option value="">Select Status</option>
          <option value="On Duty">On Duty</option>
          <option value="Off Duty">Off Duty</option>
        </select>
        <button onClick={handleAddDutyStatus} className="add-duty-btn">
          Add Duty Status
        </button>
      </div>
    </div>
  );
  
  const renderMessage = () => (
    <div className="message-container">
      <h3 className="message-title">Messages</h3>
  
      {/* Message Input Section */}
      <div className="message-input-container">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Send to (Recipient Name)"
          className="message-input"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-message-btn">
          Send Message
        </button>
      </div>
  
      {/* Messages Table */}
      <div className="table-container">
        <table className="message-table">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Sender</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td>{message.recipient}</td>
                <td>{message.sender}</td>
                <td>{message.text}</td>
              </tr>
            ))}   
          </tbody>
        </table>
      </div>
    </div>
  );
  


  
  const renderUpdateSchedules = () => (
    <div className="update-schedule-container">
      <h3 className="section-title">Update Bus Schedules</h3>
      
      <div className="table-container">
        <table className="schedule-table">
        <table className="schedule-table">
  <thead>
    <tr>
      <th>No</th>
      <th>Bus Number</th> {/* Add Bus Number column */}
      <th>Date</th>
      <th>Route</th>
      <th>Departure Time</th>
      <th>Departure Area</th>
      <th>Destination</th>
      <th>Available Seats</th>
      <th>Price (KES)</th>
    </tr>
  </thead>
  <tbody>
    {updateSchedules.map((schedule) => (
      <tr key={schedule.id}>
        <td>{schedule.id}</td>
        <td>{schedule.busNumber}</td> {/* Add Bus Number data */}
        <td>{schedule.date}</td>
        <td>{schedule.route}</td>
        <td>{schedule.departureTime}</td>
        <td>{schedule.departureArea}</td>
        <td>{schedule.destination}</td>
        <td>{schedule.availableSeats}</td>
        <td>{schedule.price}</td>
      </tr>
    ))}
  </tbody>
</table>

          </table>.
      </div>
  
      {/* Add New Schedule Form */}
      <h3 className="section-title">Add New Schedule</h3>
      <div className="add-schedule-form">
  <input type="text" name="busNumber" value={newUpdateSchedule.busNumber} onChange={handleUpdateScheduleChange} placeholder="Enter Bus Number" /> {/* Bus Number input */}
  <input type="date" name="date" value={newUpdateSchedule.date} onChange={handleUpdateScheduleChange} />
  <input type="text" name="route" value={newUpdateSchedule.route} onChange={handleUpdateScheduleChange} placeholder="Enter Route" />
  <input type="text" name="departureTime" value={newUpdateSchedule.departureTime} onChange={handleUpdateScheduleChange} placeholder="Enter Departure Time" />
  <input type="text" name="departureArea" value={newUpdateSchedule.departureArea} onChange={handleUpdateScheduleChange} placeholder="Enter Departure Area" />
  <input type="text" name="destination" value={newUpdateSchedule.destination} onChange={handleUpdateScheduleChange} placeholder="Enter Destination" />
  <input type="number" name="availableSeats" value={newUpdateSchedule.availableSeats} onChange={handleUpdateScheduleChange} placeholder="Enter Available Seats" />
  <input type="number" name="price" value={newUpdateSchedule.price} onChange={handleUpdateScheduleChange} placeholder="Enter Price" />
  <button className="add-schedule-btn" onClick={handleAddUpdateSchedule}>Add Schedule</button>
</div>

    </div>
  );
  
  

  

  return (
    <div className="driver-dashboard">
<div className="sidebar">
  <button onClick={() => handleTabClick("home")}>
    <div className="sidebar-item">
      <FaHome />
      <span>Home</span>
    </div>
  </button>
  <button onClick={() => handleTabClick("showTrips")}>
    <div className="sidebar-item">
      <FaBus />
      <span>Trips</span>
    </div>
  </button>
  <button onClick={() => handleTabClick("dutyStatus")}>
    <div className="sidebar-item">
      <FaArrowLeft />
      <span>Duty Status</span>
    </div>
  </button>
  <button onClick={() => handleTabClick("messages")}>
    <div className="sidebar-item">
      <FaEnvelope />
      <span>Messages</span>
    </div>
  </button>
  <button onClick={() => handleTabClick("updateProfile")}>
    <div className="sidebar-item">
      <FaUserCircle />
      <span>Profile</span>
    </div>
  </button>
  <button onClick={() => handleTabClick("updateBusSchedule")}>
    <div className="sidebar-item">
      <FaCalendarCheck />
      <span>Add bus</span>
    </div>
  </button>
</div>


      <div className="content">
        {activeTab === "home" && renderHomeContent()}
        {activeTab === "updateProfile" && renderUpdateProfile()}
        {activeTab === "showTrips" && renderShowTrips()}
        {activeTab === "dutyStatus" && renderDutyStatus()}
        {activeTab === "messages" && renderMessage()}
        {activeTab === "updateBusSchedule" && renderUpdateSchedules()}
      </div>
    </div>
  );
}

export default DriverDashboard;