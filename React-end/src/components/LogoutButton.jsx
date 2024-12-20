import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  
const LogoutButton = () => {
  const { setUserId, setIsAuthenticated } = useAuth(); 
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Show success message
        toast({
          title: 'Logged out',
          description: data.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });

        // Clear user authentication
        setUserId(null);
        setIsAuthenticated(false);

        localStorage.removeItem('userId');

        // Redirect to login or home page
        navigate('/');
      } else {
        const errorData = await response.json();
        // Handle error case
        toast({
          title: 'Error logging out',
          description: errorData.message || 'Logout failed',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while logging out',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Log Out
    </Button>
  );
};

export default LogoutButton;
