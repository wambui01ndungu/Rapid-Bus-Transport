import React, { useState } from "react";
import "./BusSchedule.css";

const BusSchedule = () => {
  // Sample bus schedules with both 'date' and 'route'
  const busSchedules = [
    { id: 1, busName: "Bus 101", date: "2025-01-25", route: "Route A", departure: "10:00 AM", departureArea: "Nairobi CBD", destination: "Mombasa", availableSeats: 20, price: 500 },
    { id: 2, busName: "Bus 202", date: "2025-01-25", route: "Route B", departure: "12:00 PM", departureArea: "Mombasa Town", destination: "Nakuru", availableSeats: 15, price: 700 },
    { id: 3, busName: "Bus 303", date: "2025-01-26", route: "Route A", departure: "02:00 PM", departureArea: "Nakuru Town", destination: "Kisumu", availableSeats: 10, price: 600 },
    { id: 4, busName: "Bus 404", date: "2025-01-27", route: "Route C", departure: "04:30 PM", departureArea: "Kisumu Bus Station", destination: "Nairobi", availableSeats: 25, price: 800 },
    { id: 5, busName: "Bus 505", date: "2025-01-25", route: "Route C", departure: "06:00 PM", departureArea: "Mombasa CBD", destination: "Kisumu", availableSeats: 18, price: 650 },
  ];

  // State for filters
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");

  // Handle filtering buses
  const filteredBuses = busSchedules.filter(
    (bus) =>
      (selectedRoute === "" || bus.route === selectedRoute) && // Filter by route
      (selectedDate === "" || bus.date === selectedDate) // Filter by date
  );

  return (
    <div className="bus-schedule-container">
      <h2>View Available Schedules</h2>

      {/* Filters Section */}
      <div className="filters">
        <label>Select Travel Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <label>Select Route:</label>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
        >
          <option value="">All Routes</option>
          <option value="Route A">Route A</option>
          <option value="Route B">Route B</option>
          <option value="Route C">Route C</option>
        </select>
      </div>

      {/* Bus Schedule Table */}
      <table className="bus-schedule-table">
        <thead>
          <tr>
            <th>Bus Name</th>
            <th>Date</th>
            <th>Route</th>
            <th>Departure Time</th>
            <th>Departure Area</th>
            <th>Destination</th>
            <th>Available Seats</th>
            <th>Price (KES)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busName}</td>
                <td>{bus.date}</td>
                <td>{bus.route}</td> {/* Display the Route */}
                <td>{bus.departure}</td>
                <td>{bus.departureArea}</td>
                <td>{bus.destination}</td>
                <td>{bus.availableSeats}</td>
                <td>{bus.price}</td>
                <td>
                  <button className="book-btn" onClick={() => alert(`Booking ${bus.busName}`)}>
                    Book Now
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No buses available for the selected date and route.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BusSchedule;

