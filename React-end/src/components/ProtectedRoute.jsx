// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this path is correct based on your folder structure

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get the authentication status from context

  // If the user is not authenticated, redirect to the landing page
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
