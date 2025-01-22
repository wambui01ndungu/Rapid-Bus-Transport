import React, { useEffect } from "react";
import Dashboard from "./components/Dashboard"; // Ensure the path to Dashboard is correct.
import "./index.css"; // Import Tailwind styles

function App() {
  useEffect(() => {
    document.title = "Rapid Bus Transport"; // Dynamically set the page title.
  }, []);

  return (
    <div>
      {/* Render the Dashboard component */}
      <Dashboard />
    </div>
  );
}

export default App;



