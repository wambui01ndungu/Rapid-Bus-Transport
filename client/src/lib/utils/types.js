/**
 * @typedef {Object} Seat
 * @property {string} id
 * @property {string} number
 * @property {boolean} isAvailable
 * @property {number} price
 */

/**
 * @typedef {Object} Bus
 * @property {string} id
 * @property {string} name
 * @property {string} route
 * @property {string} departureTime
 * @property {string} arrivalTime
 * @property {Seat[]} seats
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} userId
 * @property {string} busId
 * @property {string} seatNumber
 * @property {string} terminal
 * @property {string} destination
 * @property {string} travelDate
 * @property {string} travelTime
 * @property {'PENDING' | 'CONFIRMED' | 'CANCELLED'} status
 * @property {number} price
 * @property {string} createdAt
 */