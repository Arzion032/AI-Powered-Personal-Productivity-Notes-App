// src/LandingPage.jsx
import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate  } from 'react-router-dom';
import { useAuth } from './AuthContext'; 


const LandingPage = () => {
  const { userId } = useAuth();
  const toast = useToast();
  const [user, userLogin] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const { setUserId, setIsAuthenticated } = useAuth(); 

  const submitUser = async (e) => {
    e.preventDefault();

    try {
      if (userId !== null) {
        toast({
          title: 'Already logged in',
          description: "Dumb Bitch",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: "top-center"
      });
      navigate("/todos");
      return;
      }
    
      
    
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include',
       
    });
    const data = await response.json();
    if (response.ok) {
        toast({
            title: 'Successfully Login',
            description: data.message,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: "top-center"
        });

        userLogin({
            username: '',
            email: '',
            password: '',
        });
        setUserId(data.user.id); // Set user ID from response
        setIsAuthenticated(true);
        navigate('/todos');
    }
    else {
        toast({
            title: 'Cant Login',
            description: data.error,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: "top-center"
        });
    }
    
} catch (error) {
    toast({
        title: 'Error',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: "top-center"
    });
    
}}
  return ( 
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="4xl" mb={4}>Welcome to My To-Do App</Text>
      <Text fontSize="lg" mb={6}>Stay organized and productive with your personalized to-do list.</Text>

        <Box w= "50%" mx="auto" borderWidth="1px" maxW="sm" padding={8} borderRadius="7.5" bgColor={"#323C4B"}>
      <Flex alignItems={"center"} gap={3} direction="column" > 
        <form onSubmit={submitUser}>
          <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value ={user.email} onChange = {(e) => userLogin({...user, email: e.target.value})}/>
          </FormControl>
          <FormControl>
              <FormLabel>Password</FormLabel>
              <Input value ={user.password} onChange = {(e) => userLogin({...user, password: e.target.value})}/>
          </FormControl>
  
          <Button type="submit" width="100%" 
                            padding={5} 
                            mt={5} mb={2} >
              Login
          </Button>

          <Link to="/register" style={{ width: '100%' }}>
          <Button width={"100%"} 
          bgColor={"green"}     
          _hover={{ bg: "green.600" }} // Use a lighter green on hover
          _focus={{ boxShadow: "none" }}>
              Create Account
          </Button>
          </Link>
          </form>
        </Flex>
        </Box>
    
    </Box>
  
  );
};

export default LandingPage;
