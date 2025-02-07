import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('user_role');
  const token = localStorage.getItem('token');

  if (!token) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Not authorized, redirect to unauthorized page or default
    return <Navigate to="/" replace />; // Redirect to Home for unauthorized access
  }

  return children; // User is authenticated and authorized
};

export default ProtectedRoute;
