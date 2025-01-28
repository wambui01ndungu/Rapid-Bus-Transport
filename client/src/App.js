import React from 'react';
import {Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Ensure to create and link a CSS file for styling
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import DriverDashboard from './components/DriverDashboard';
import BusSchedule from './components/BusSchedule';
import UserDashboard from './components/UserDashboard';


// Placeholder components for routes (to be implemented later)

// const Bookings = () => (
//   <section id="bookings">
//     <h2>Your Bookings</h2>
//     <p>Manage your bookings: view, cancel, or modify your seat reservations.</p>
//     {/* Placeholder for dynamic booking data */}
//     <ul>
//       <li>Booking ID: 12345, Bus 1, Route A, Date: 2025-01-25</li>
//       <li>Booking ID: 12346, Bus 2, Route B, Date: 2025-01-26</li>
//     </ul>
//   </section>
// );

// const Login = () => (
//   <section id="login">
//     <h2>Login</h2>
//     <p>Access your account to manage bookings and schedules.</p>
//     <form>
//       <input type="email" placeholder="Email" required />
//       <input type="password" placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   </section>
// );

const Register = () => (
  <section id="register">
    <h2>Register</h2>
    <p>Create a new account to start booking your travels.</p>
    <form>
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </section>
);

// const AdminDashboard = () => (
//   <section id="admin-dashboard">
//     <h2>Admin Dashboard</h2>
//     <p>Manage bus schedules, routes, and bookings from here.</p>
//     {/* Placeholder for admin controls */}
//     <button>Add New Bus</button>
//     <button>View Bookings</button>
//   </section>
// );

// const DriverDashboard = () => (
//   <section id="driver-dashboard">
//     <h2>Driver Dashboard</h2>
//     <p>Manage your buses, add schedules, and view your bookings.</p>
//     {/* Placeholder for driver controls */}
//     <button>Add New Bus</button>
//     <button>Schedule Bus</button>
//   </section>
// );

// Main App component with routing and navigation
function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/busSchedules"> Bus Schedule</Link></li>
            <li><Link to="/bookings">My Bookings</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/busSchedules" element={<BusSchedule />} />
          <Route path="/bookings" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </main>  

      <footer>
        <p>&copy; 2025 Bus Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;




