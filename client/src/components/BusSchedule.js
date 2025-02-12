import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BusSchedule.css";

// **Simulated Bus Schedule Data**
const simulatedBusSchedules = [
  {
    id: "1",
    bus_number: "SR 5",
    date: "2025-02-15",
    route: "Nairobi-Mombasa",
    departure: "07:00",
    departure_area: "Nairobi",
    destination: "Mombasa",
    available_seats: 40,
    price: 3500,
  },
  {
    id: "2",
    bus_number: "SR 7",
    date: "2025-02-15",
    route: "Mombasa-Nairobi",
    departure: "08:00",
    departure_area: "Mombasa",
    destination: "Nairobi",
    available_seats: 30,
    price: 1300,
  },
  {
    id: "3",
    bus_number: "SR 32",
    date: "2025-02-16",
    route: "Nairobi-Kisumu",
    departure: "09:00",
    departure_area: "Nairobi",
    destination: "Kisumu",
    available_seats: 15,
    price: 1500,
  },
  {
    id: "4",
    bus_number: "SR 23",
    date: "2025-02-16",
    route: "Kisumu-Nairobi",
    departure: "10:00",
    departure_area: "Kisumu",
    destination: "Nairobi",
    available_seats: 20,
    price: 1400,
  },
  {
    id: "5",
    bus_number: "SR 20",
    date: "2025-02-17",
    route: "Nairobi-Nakuru",
    departure: "11:00",
    departure_area: "Nairobi",
    destination: "Nakuru",
    available_seats: 35,
    price: 1000,
  },
  {
    id: "6",
    bus_number: "SR 4",
    date: "2025-02-17",
    route: "Nakuru-Nairobi",
    departure: "12:00",
    departure_area: "Nakuru",
    destination: "Nairobi",
    available_seats: 40,
    price: 900,
  },
];

// **searchBuses Function**
export const searchBuses = async ({ terminal, destination, date, time }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    const filteredBuses = simulatedBusSchedules.filter((bus) => {
      const terminalMatch = bus.departure_area.toLowerCase().includes(terminal.toLowerCase());
      const destinationMatch = bus.destination.toLowerCase().includes(destination.toLowerCase());
      const dateMatch = bus.date === date;
  
      //Allow a 30 minute time range
      const [searchHours, searchMinutes] = time.split(":").map(Number);
      const [busHours, busMinutes] = bus.departure.split(":").map(Number);
  
      const searchTimeInMinutes = searchHours * 60 + searchMinutes;
      const busTimeInMinutes = busHours * 60 + busMinutes;
  
      const timeDifference = Math.abs(searchTimeInMinutes - busTimeInMinutes);
      const timeMatch = timeDifference <= 30;
  
      return terminalMatch && destinationMatch && dateMatch && timeMatch;
    });
  
    return {
      success: true,
      buses: filteredBuses,
    };
  };

const BusSchedule = () => {
  const [busSchedules, setBusSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching schedules from an API
    const fetchSchedules = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setBusSchedules(simulatedBusSchedules); // Set with simulated data
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Error fetching schedules. Please try again later."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []); // Empty dependency array ensures this runs only once on mount

  const filteredBuses = busSchedules.filter(
    (bus) =>
      (selectedRoute === "" || bus.route === selectedRoute) &&
      (selectedDate === "" || bus.date === selectedDate)
  );

  // Dynamically generate route options
  const availableRoutes = [...new Set(busSchedules.map((bus) => bus.route))];

  const handleBookNow = (bus) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Check if token exists (not just if it's "true")
      alert(`Booking ${bus.bus_number}`); // Or your actual booking logic
      // ... your booking logic here (API call, etc.) ...
    } else {
      // User is not logged in, redirect to login/signup
      alert("You must be logged in to book a bus.");
      navigate("/login"); // Or navigate("/signup")
    }
  };

  return (
    <div className="bus-schedule-container">
      <h2>View Available Schedules</h2>

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
          {availableRoutes.map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>
      </div>

      {loading && <div>Loading bus schedules...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && !error && (
        <table className="bus-schedule-table">
          <thead>
            <tr>
              <th>Bus number</th>
              <th>Route</th>
              <th>Date</th>
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
                  <td>{bus.bus_number}</td>
                  <td>{bus.route}</td>
                  <td>{bus.date}</td>
                  <td>{bus.departure}</td>
                  <td>{bus.departure_area}</td>
                  <td>{bus.destination}</td>
                  <td>{bus.available_seats}</td>
                  <td>{bus.price}</td>
                  <td>
                    <button
                      className="book-btn"
                      onClick={() => handleBookNow(bus)}
                    >
                      Book Now
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  No buses available for the selected date and route.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BusSchedule;