import React, { useState } from "react";
import { ChevronDown, Home, User } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("DASHBOARD OVERVIEW");

  // Sample data
  const fleetData = [
    { id: 1, model: "Volvo 9700", capacity: 52, status: "Available", lastService: "2024-03-15" },
    { id: 2, model: "Scania Irizar", capacity: 45, status: "In Service", lastService: "2024-03-10" }
  ];

  const driverData = [
    { id: 1, name: "John Doe", license: "CDL-1234", routes: "Nairobi-Mombasa", status: "Active" },
    { id: 2, name: "Jane Smith", license: "CDL-5678", routes: "Nairobi-Kisumu", status: "On Leave" }
  ];

  const userData = [
    { id: 1, email: "admin@safiri.com", role: "Admin" },
    { id: 2, email: "manager@safiri.com", role: "Manager" }
  ];

  const revenueData = {
    total: 2450000,
    expenses: 850000,
    profit: 1600000,
    topRoutes: [
      { name: "Nairobi-Mombasa", revenue: 980000 },
      { name: "Nairobi-Kisumu", revenue: 750000 }
    ]
  };

  const supportTickets = [
    { id: 1234, issue: "Booking Modification", status: "In Progress", assigned: "Support Team 1" },
    { id: 1235, issue: "Payment Issue", status: "Resolved", assigned: "Support Team 2" }
  ];

  const sidebarItems = [
    { name: "DASHBOARD OVERVIEW", icon: Home },
    { name: "BOOKING MANAGEMENT", icon: ChevronDown },
    { name: "FLEET MANAGEMENT", icon: ChevronDown },
    { name: "ROUTES MANAGEMENT", icon: ChevronDown },
    { name: "DRIVER MANAGEMENT", icon: ChevronDown },
    { name: "USER MANAGEMENT", icon: User },
    { name: "REVENUE", icon: ChevronDown },
    { name: "SUPPORT REQUESTS", icon: ChevronDown }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between bg-amber-600 p-4 text-black">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          <h1 className="text-xl font-bold">Safiri Link</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded-full bg-gray-200 text-black"
            />
          </div>
          {/* Add the Signup Link here */}
          <Link 
            to="/signup" 
            className="text-black hover:text-gray-800 transition-colors"
          >
            Create Account
          </Link>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-black bg-white rounded-full p-1" />
            <span className="text-sm">Welcome Admin Jane</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-gray-200 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item.name)}
                className={`w-full text-left p-3 rounded transition flex items-center gap-2 ${
                  activeSection === item.name
                    ? "bg-amber-600 text-black"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Dashboard Overview */}
          {activeSection === "DASHBOARD OVERVIEW" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
              <ul className="list-disc pl-6">
                {sidebarItems.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Booking Management */}
          {activeSection === "BOOKING MANAGEMENT" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Booking Date</label>
                    <input type="date" className="w-full p-2 bg-white rounded border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Driver</label>
                    <select className="w-full p-2 bg-white rounded border">
                      <option>Select Driver</option>
                      <option>Driver 1</option>
                      <option>Driver 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Booking Number</label>
                    <input type="text" className="w-full p-2 bg-white rounded border" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Assign Driver to Route</label>
                    <div className="flex gap-2">
                      <input type="text" className="w-full p-2 bg-white rounded border" placeholder="Driver Name" />
                      <input type="text" className="w-full p-2 bg-white rounded border" placeholder="Route" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Revenue</label>
                    <input type="number" className="w-full p-2 bg-white rounded border" placeholder="KES" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fleet Management */}
          {activeSection === "FLEET MANAGEMENT" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Fleet Management</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Add New Vehicle</label>
                    <input type="text" className="w-full p-2 bg-white rounded border" placeholder="Vehicle Model" />
                    <input type="number" className="w-full p-2 bg-white rounded border mt-2" placeholder="Capacity" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium mb-2">Fleet Status</h3>
                  <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="p-2">Model</th>
                        <th className="p-2">Capacity</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fleetData.map(vehicle => (
                        <tr key={vehicle.id} className="border-b">
                          <td className="p-2">{vehicle.model}</td>
                          <td className="p-2">{vehicle.capacity}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded ${
                              vehicle.status === 'Available' ? 'bg-green-200' : 'bg-yellow-200'
                            }`}>
                              {vehicle.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Routes Management */}
          {activeSection === "ROUTES MANAGEMENT" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">🚦 Routes Management</h2>
                <button className="bg-amber-600 text-black px-4 py-2 rounded-md hover:bg-amber-700 transition-colors">
                  + Create New Route
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Route Configuration */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-3">Route Configuration</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li className="flex items-center gap-2">
                      <span>🗺️ Assign routes to specific drivers</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Drag & Drop</span>
                    </li>
                    <li>📝 Update route details (stops, destinations, schedules)</li>
                    <li>⏱️ Set time windows for deliveries/pickups</li>
                    <li>⚙️ Configure route optimization parameters</li>
                  </ul>
                </div>

                {/* Real-time Monitoring */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Live Monitoring</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li className="flex items-center gap-2">
                      <span>📡 Real-time GPS tracking</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </li>
                    <li>🚨 Automatic delay alerts</li>
                    <li>📊 Performance dashboard:
                      <ul className="list-circle pl-4 mt-2 space-y-2">
                        <li>⏰ Timeliness metrics</li>
                        <li>🚦 Traffic pattern analysis</li>
                        <li>⛽ Fuel efficiency tracking</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Advanced Features Section */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Advanced Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-2">📅 Historical Analysis</h4>
                    <p className="text-sm text-gray-600">Compare route performance over time</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-2">📱 Driver Communication</h4>
                    <p className="text-sm text-gray-600">In-app messaging & notifications</p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-2">📈 Predictive Analytics</h4>
                    <p className="text-sm text-gray-600">AI-powered ETA predictions</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Driver Management */}
          {activeSection === "DRIVER MANAGEMENT" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Driver Management</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <input type="text" className="w-full p-2 bg-white rounded border" placeholder="Driver Name" />
                  <input type="text" className="w-full p-2 bg-white rounded border" placeholder="License Number" />
                </div>
                <div>
                  <table className="w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">License</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverData.map(driver => (
                        <tr key={driver.id} className="border-b">
                          <td className="p-2">{driver.name}</td>
                          <td className="p-2">{driver.license}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded ${
                              driver.status === 'Active' ? 'bg-green-200' : 'bg-yellow-200'
                            }`}>
                              {driver.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeSection === "USER MANAGEMENT" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Create New User</label>
                    <input
                      type="email"
                      className="w-full p-2 bg-white rounded border mb-2"
                      placeholder="Email Address"
                    />
                    <select className="w-full p-2 bg-white rounded border">
                      <option>Select Role</option>
                      <option>Admin</option>
                      <option>Manager</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium mb-2">User List</h3>
                  <div className="bg-white rounded-lg p-4">
                    {userData.map(user => (
                      <div key={user.id} className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-gray-600">{user.role}</p>
                        </div>
                        <button className="text-red-600 text-sm hover:text-red-800">
                          Revoke Access
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Management */}
          {activeSection === "REVENUE" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Revenue Management</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Financial Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span className="font-medium">KES {revenueData.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operational Costs:</span>
                      <span className="text-red-600">KES {revenueData.expenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Net Profit:</span>
                      <span className="font-medium text-green-600">
                        KES {revenueData.profit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Top Performing Routes</h3>
                  <ul className="space-y-2">
                    {revenueData.topRoutes.map((route, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{route.name}</span>
                        <span>KES {route.revenue.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Support Requests */}
          {activeSection === "SUPPORT REQUESTS" && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Support Requests</h2>
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-3 text-left">Ticket ID</th>
                      <th className="p-3 text-left">Issue Type</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Assigned To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportTickets.map(ticket => (
                      <tr key={ticket.id} className="border-b">
                        <td className="p-3">#{ticket.id}</td>
                        <td className="p-3">{ticket.issue}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded ${
                            ticket.status === 'Resolved' ? 'bg-green-200' :
                            ticket.status === 'In Progress' ? 'bg-yellow-200' : 'bg-gray-200'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-3">{ticket.assigned}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;