import React, { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, IconButton } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Register = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [userRegister, setRegister ] = useState({
        username: '',
        email: '',
        password: ''
    }); 

    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword); // Toggle the visibility
    };

    

    const registerUser = async (e) => {
        e.preventDefault();

        try {
        
        const response = await fetch('http://localhost:5000/registeruser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userRegister),
        });
        const data = await response.json();
        if (response.ok) {
            toast({
                title: 'Successfully Registered',
                description: data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top-center"
            });

            setRegister({
                username: '',
                email: '',
                password: '',
            });
            navigate('/');
        }
        else {
            toast({
                title: 'Error',
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
        
    }
    }


  return ( 
    <Box textAlign="center" py={10} px={6}>
      <Text fontSize="4xl" mb={4}>Welcome to My To-Do App</Text>
      <Text fontSize="lg" mb={6}>Create Account</Text>

        <Box w= "50%" mx="auto" borderWidth="1px" maxW="sm" padding={8} borderRadius="7.5" bgColor={"#323C4B"}>
      <Flex alignItems={"center"} gap={3} direction="column" > 
      <form onSubmit={ registerUser }>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder='' 
        value={userRegister.email}
        onChange={(e) => setRegister({...userRegister, email: e.target.value}) }
        />
    </FormControl>
        
    <FormControl>
        <FormLabel>Username</FormLabel>
        <Input placeholder='' 
        value={userRegister.username}
        onChange={(e) => setRegister({...userRegister, username: e.target.value}) }
        />
    </FormControl>
    <FormControl>
    <FormLabel>Password</FormLabel>
    <InputGroup>
        <Input
            placeholder=''
            value={userRegister.password}
            onChange={(e) => setRegister({ ...userRegister, password: e.target.value })}
            type={showPassword ? 'text' : 'password'}
        />
        <InputRightElement>
            <IconButton
                size='sm'
                onClick={handlePasswordToggle}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                variant='ghost'
            />
        </InputRightElement>
    </InputGroup>
</FormControl>
                    <Button  type="submit" 
                            width="100%" 
                            padding={5} 
                            mt={5} mb={2} >
                        Create Account
                    </Button>
                    <Link to="/" style={{ width: '100%' }}>
                    <Button width={"100%"} 
                    bgColor={"green"}     
                    _hover={{ bg: "green.600" }} // Use a lighter green on hover
                    _focus={{ boxShadow: "none" }}>
                        Already have an account?
                    </Button>
                    </Link>
            </ form>
            </Flex>
        </Box>
    </Box>
  
  );
};

export default Register;
