import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; // Adjust the import path
import { AuthProvider } from './components/AuthContext'; // Adjust the import path


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ChakraProvider>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing page for login */}
          <Route 
              path="/todos" 
              element={
                <ProtectedRoute>
                  <App /> {/* Only authenticated users can access App */}
                </ProtectedRoute>
              } 
            /> 
          <Route path="/register" element = {<Register />}/>
        </Routes>
      </Router> 
     </AuthProvider>
    </ChakraProvider>
  </StrictMode>,
)
