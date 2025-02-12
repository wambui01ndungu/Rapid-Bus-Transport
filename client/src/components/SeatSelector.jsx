import React, { useState } from 'react'

export function SeatSelector({ seats, onSelect, selectedSeat }) {
  const [hoveredSeat, setHoveredSeat] = useState(null)

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Select Your Seat</h3>
      <div className="grid grid-cols-4 gap-2">
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.isAvailable && onSelect(seat)}
            onMouseEnter={() => setHoveredSeat(seat.id)}
            onMouseLeave={() => setHoveredSeat(null)}
            disabled={!seat.isAvailable}
            className={`
              p-2 rounded-md text-sm font-medium transition-colors
              ${
                selectedSeat?.id === seat.id
                  ? 'bg-amber-600 text-white'
                  : seat.isAvailable
                  ? 'bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {hoveredSeat === seat.id ? (
              <span>Kshs {seat.price}</span>
            ) : (
              <span>Seat {seat.number}</span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border-2 border-amber-600" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-600" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  )
}