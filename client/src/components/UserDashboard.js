import { useState, useEffect } from "react"
import { Clock, MapPin, Wallet, Calendar, Truck, Loader2 } from "lucide-react"
import { SeatSelector } from './SeatSelector.jsx'
import { createBooking, cancelBooking, fetchAvailableSeats } from "../lib/actions/booking"
import { searchBuses } from "./BusSchedule" 

const toast = {
  success: (message) => alert(message),
  error: (message) => alert(message),
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("BOOK_TICKET")
  const [bookingData, setBookingData] = useState({
    terminal: "",
    destination: "",
    time: "",
    date: "",
  })
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [availableSeats, setAvailableSeats] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [selectedBus, setSelectedBus] = useState(null)

  const terminals = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"]
  const destinations = ["Mombasa", "Nairobi", "Kisumu", "Nakuru", "Eldoret"]

  const handleSearch = async () => {
    if (!bookingData.terminal || !bookingData.destination || !bookingData.date || !bookingData.time) {
      toast.error("Please fill in all booking details")
      return
    }

    setIsLoading(true)
    const results = await searchBuses({
      terminal: bookingData.terminal,
      destination: bookingData.destination,
      date: bookingData.date,
      time: bookingData.time,
    })

    if (results.success) {
      setSearchResults(results.buses);
      console.log("Search Results:", results.buses); 
    } else {
      toast.error("Failed to search buses")
    }
    setIsLoading(false)
  }

  const handleSelectBus = (bus) => {
    console.log("Selected Bus:", bus);
    setSelectedBus(bus)
    loadAvailableSeats(bus.id)
  }

  const loadAvailableSeats = async (busId) => {
    setIsLoading(true)
    const result = await fetchAvailableSeats(busId, bookingData.date)
    if (result.success) {
      setAvailableSeats(result.seats)
    } else {
      toast.error("Failed to load available seats")
    }
    setIsLoading(false)
  }

  const handleBooking = async () => {
    if (!selectedSeat) {
      toast.error("Please select a seat")
      return
    }

    setIsLoading(true)
    const result = await createBooking({
      userId: "user-1",
      busId: selectedBus.id,
      seatNumber: selectedSeat.number,
      terminal: bookingData.terminal,
      destination: bookingData.destination,
      travelDate: bookingData.date,
      travelTime: bookingData.time,
      status: "CONFIRMED",
      price: selectedSeat.price,
    })

    if (result.success) {
      toast.success("Booking confirmed!")
      setBookings([...bookings, result.booking])
      setActiveTab("BOOKINGS")
      setBookingData({
        terminal: "",
        destination: "",
        time: "",
        date: "",
      })
      setSelectedSeat(null)
      setSelectedBus(null)
      setSearchResults([])
    } else {
      toast.error("Failed to create booking")
    }
    setIsLoading(false)
  }

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?")
    if (!confirmed) return

    setIsLoading(true)
    const result = await cancelBooking(bookingId)
    if (result.success) {
      toast.success("Booking cancelled successfully")
      setBookings(bookings.filter((b) => b.id !== bookingId))
    } else {
      toast.error("Failed to cancel booking")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-amber-600 p-4 text-white">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8" />
            <h1 className="text-2xl font-bold">SafiriLink</h1>
          </div>
          <div className="flex items-center gap-4">
            <Wallet className="h-6 w-6" />
            <span className="flex items-center gap-2">
              <span>Balance:</span>
              <span className="font-bold">Kshs 3,500</span>
            </span>
            <div className="h-8 w-px bg-white/50"></div>
            {/* <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <span>JD</span>
              </div>
              <span>John Doe</span>
            </div> */}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex gap-8 p-4">
          <button
            onClick={() => setActiveTab("BOOK_TICKET")}
            className={`pb-2 px-4 ${
              activeTab === "BOOK_TICKET" ? "border-b-2 border-amber-600 font-bold" : "text-gray-500"
            }`}
          >
            Book Ticket
          </button>
          <button
            onClick={() => setActiveTab("BOOKINGS")}
            className={`pb-2 px-4 ${
              activeTab === "BOOKINGS" ? "border-b-2 border-amber-600 font-bold" : "text-gray-500"
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("ACCOUNT")}
            className={`pb-2 px-4 ${
              activeTab === "ACCOUNT" ? "border-b-2 border-amber-600 font-bold" : "text-gray-500"
            }`}
          >
            Account Settings
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {activeTab === "BOOK_TICKET" ? (
        <main className="max-w-6xl mx-auto p-4">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Choose Plan</h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Terminal</label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={bookingData.terminal}
                    onChange={(e) => setBookingData({ ...bookingData, terminal: e.target.value })}
                  >
                    <option value="">Select Terminal</option>
                    {terminals.map((terminal) => (
                      <option key={terminal} value={terminal}>
                        {terminal}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Destination</label>
                  <select
                    className="w-full p-3 border rounded-lg"
                    value={bookingData.destination}
                    onChange={(e) => setBookingData({ ...bookingData, destination: e.target.value })}
                  >
                    <option value="">Select Destination</option>
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Travel Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg bg-gray-800 text-white [&::-webkit-calendar-picker-indicator]:filter-white"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Travel Time</label>
                  <input
                    type="time"
                    className="w-full p-3 border rounded-lg bg-gray-800 text-white [&::-webkit-calendar-picker-indicator]:filter-white"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading || !bookingData.terminal || !bookingData.destination || !bookingData.date || !bookingData.time}
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </span>
              ) : (
                "Search Buses"
              )}
            </button>

            {searchResults.length > 0 ? (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Available Buses</h3>
            {searchResults.map((bus) => (
                <div
                    key={bus.id}
                    className={`p-4 border rounded-lg mb-2 cursor-pointer ${selectedBus?.id === bus.id ? "bg-amber-50 border-amber-600" : "bg-white"
                        }`}
                    onClick={() => handleSelectBus(bus)}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{bus.name}</span>
                        <span>{bus.departureTime}</span>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        searchResults.length === 0 && bookingData.terminal !== "" && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">No available buses found for the selected criteria.</p>
            </div>
        )
    )
}
            {selectedBus && (
              <div className="mt-6">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
                  </div>
                ) : (
                  <SeatSelector seats={availableSeats} selectedSeat={selectedSeat} onSelect={setSelectedSeat} />
                )}
              </div>
            )}

            {selectedBus && selectedSeat && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-gray-900">Selected Seat Price:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedSeat ? `Kshs ${selectedSeat.price}` : "No seat selected"}
                  </span>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={isLoading || !selectedSeat}
                  className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    "Book Now"
                  )}
                </button>
              </div>
            )}
          </div>
        </main>
      ) : activeTab === "BOOKINGS" ? (
        <main className="max-w-6xl mx-auto p-4">
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">No bookings found</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-600">
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium">
                          {booking.terminal} → {booking.destination}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.travelDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.travelTime}</span>
                        </div>
                        <span>Seat: {booking.seatNumber}</span>
                        <span>Price: Kshs {booking.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "CANCELLED"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <div className="space-x-2">
                        <button className="text-amber-600 hover:text-amber-700">View Ticket</button>
                        {booking.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">M-Pesa</p>
                    <p className="text-gray-600">Connect your M-Pesa</p>
                  </div>
                  <button className="text-amber-600 hover:text-amber-700">Connect</button>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50">
                  Add New Payment Method
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input type="email" defaultValue="johndoe@example.com" className="w-full p-2 border rounded" />
                </div>
                <button className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">Update Profile</button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

export default UserDashboard