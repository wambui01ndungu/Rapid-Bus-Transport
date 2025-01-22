 // what to be done according to the design
 // Driver
//Availability
//Vehicle 
//Assign Driver 
//Driver’s Profile 
//Name
//Contact
//Licence Detals
import React, { useState, useEffect } from "react";
import axios from "axios";

function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    license: "",
    vehicle_id: "",
  });
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Fetch drivers and vehicles from the backend
  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/drivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/vehicles");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  // Add or update a driver
  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://127.0.0.1:5000/drivers/${selectedDriver.id}`,
          form
        );
        alert("Driver updated successfully.");
      } else {
        await axios.post("http://127.0.0.1:5000/drivers", form);
        alert("Driver added successfully.");
      }
      setForm({ name: "", contact: "", license: "", vehicle_id: "" });
      setEditMode(false);
      fetchDrivers();
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  };

  // Delete a driver
  const handleDeleteDriver = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/drivers/${id}`);
      alert("Driver deleted successfully.");
      fetchDrivers();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  // Select a driver for editing
  const handleEditDriver = (driver) => {
    setForm({
      name: driver.name,
      contact: driver.contact,
      license: driver.license,
      vehicle_id: driver.vehicle_id || "",
    });
    setSelectedDriver(driver);
    setEditMode(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Driver Management</h1>

      {/* Add/Edit Driver Form */}
      <form onSubmit={handleDriverSubmit}>
        <h2>{editMode ? "Edit Driver" : "Add Driver"}</h2>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
        />
        <input
          placeholder="License Details"
          value={form.license}
          onChange={(e) => setForm({ ...form, license: e.target.value })}
          required
        />
        <select
          value={form.vehicle_id}
          onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
        >
          <option value="">Assign Vehicle (Optional)</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.name} - {vehicle.plate}
            </option>
          ))}
        </select>
        <button type="submit">
          {editMode ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      {/* Driver List */}
      <h2>Drivers and Status</h2>
      <table border="1" style={{ margin: "20px auto", width: "80%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>License</th>
            <th>Assigned Vehicle</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.contact}</td>
              <td>{driver.license}</td>
              <td>
                {driver.vehicle
                  ? `${driver.vehicle.name} - ${driver.vehicle.plate}`
                  : "Unassigned"}
              </td>
              <td>{driver.available ? "Available" : "Unavailable"}</td>
              <td>
                <button onClick={() => handleEditDriver(driver)}>Edit</button>
                <button onClick={() => handleDeleteDriver(driver.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriverManagement;
