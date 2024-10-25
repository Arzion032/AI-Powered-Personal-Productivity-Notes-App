import { Grid, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import  UserCard  from './UserCard';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

const UserGrid = ({ users, setUsers }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const toast = useToast();
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/friends', {
                    method: 'GET',  // Specify the method
                    credentials: 'include', 
                   
                });
                const data = await res.json();
                // Handle unauthorized access
                if (res.status === 401) {
                    toast({
                        title: "Error",
                        description: "PRE?",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate('/');  // Redirect to login page
                    return;
                }

                
                
                if (!res.ok) {
                    throw new Error(data.error || 'Failed to fetch friends');
                }
                
                setUsers(data);
            } catch (err) {
                console.error(err);
                toast({
                    title: "Error",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, [setUsers, navigate, toast]);
    


return (
    <>
    <Grid 
        templateColumns={{
            base:"1fr",
            md:"repeat(2, fr)",
            lg:"repeat(3, 1fr)",
        }}gap={6} padding={4}
        > 
    {users.map((user)=> (
        <UserCard key={user.id} user={user} setUsers={setUsers}/>
    ))}
    </Grid>
    {isLoading && (
        <Flex justifyContent={"center"}>
            <Spinner size={"xl"} />
        </Flex>
    )}
    {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
            <Text fontSize={"xl"}>
                <Text as="span" fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                    Poor you!
                </Text>
                No friends fond.
            </Text>
        </Flex>)}
    </>
    );
};

export default UserGrid;