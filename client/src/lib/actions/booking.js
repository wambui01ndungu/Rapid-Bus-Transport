// Simulated database for bookings
const bookings = []

export async function createBooking(booking) {
  try {
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newBooking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }

    // Simulated storing of booking
    bookings.push(newBooking)
    console.log("Created booking:", newBooking)

    return { success: true, booking: newBooking }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, error: "Failed to create booking" }
  }
}

export async function updateBooking(bookingId, updates) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const bookingIndex = bookings.findIndex((b) => b.id === bookingId)
    if (bookingIndex !== -1) {
      bookings[bookingIndex] = { ...bookings[bookingIndex], ...updates }
      console.log("Updated booking:", bookings[bookingIndex])
    } else {
      throw new Error("Booking not found")
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating booking:", error)
    return { success: false, error: "Failed to update booking" }
  }
}

export async function cancelBooking(bookingId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const bookingIndex = bookings.findIndex((b) => b.id === bookingId)
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = "CANCELLED"
      console.log("Cancelled booking:", bookings[bookingIndex])
    } else {
      throw new Error("Booking not found")
    }

    return { success: true }
  } catch (error) {
    console.error("Error cancelling booking:", error)
    return { success: false, error: "Failed to cancel booking" }
  }
}

export async function fetchAvailableSeats(busId, date) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const seats = Array.from({ length: 40 }, (_, i) => ({
      id: `seat-${i + 1}`,
      number: `${i + 1}`,
      isAvailable: Math.random() > 0.3,
      price: 3500,
    }))

    return { success: true, seats }
  } catch (error) {
    console.error("Error fetching seats:", error)
    return { success: false, error: "Failed to fetch available seats" }
  }
}