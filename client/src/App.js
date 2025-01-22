import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="*" element={<Dashboard />} /> {/* Fallback route */}
    </Routes>
  );
}

export default App;



