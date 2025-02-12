// ScheduleContext.js
import React, { createContext, useState } from 'react';

export const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [updateSchedules, setUpdateSchedules] = useState([
    { id: 1, busNumber:"50", date: "15-02-2025", route: "Mombasa - Nairobi", departureTime: "07:02 pm", departureArea: "Mombasa", destination: "Nairobi", availableSeats: "30", price: "3000" },
  ]);

  const addUpdateSchedule = (newSchedule) => {
    setUpdateSchedules([...updateSchedules, { id: updateSchedules.length + 1, ...newSchedule }]);
  };

  return (
    <ScheduleContext.Provider value={{ updateSchedules, addUpdateSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};
