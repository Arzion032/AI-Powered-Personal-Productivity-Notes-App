import { useState } from 'react'
import { Button, Stack, Container, Text, useDisclosure } from '@chakra-ui/react'
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"
import Dashboard from './components/dashboard'
import { Layout } from 'lucide-react'
import LogoutButton from './components/LogoutButton';

function App() {
  const [users, setUsers] = useState([]);
  const { 
    isOpen: isDashboardOpen,     // renamed from isOpen
    onOpen: onDashboardOpen,     // renamed from onOpen
    onClose: onDashboardClose    // renamed from onClose
  } = useDisclosure();

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers}/>
        <Container maxW={"1200px"} my={4}>
          <Text
              fontSize={{base: "3xl", md: "50"}}
              fontWeight={"bold"}
              letterSpacing={"2px"}
              textTransform={"uppercase"}
              textAlign={"center"}
              mb={8}
              >
                <Text
                as={"span"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}
                >
                  BatMan
                </Text>
                🦇
          </Text>

          <UserGrid users={users} setUsers={setUsers}/>
          <Button 
        leftIcon={<Layout />} 
        colorScheme="blue" 
        onClick={onDashboardOpen}  // using renamed function
      >
        Open Dashboard
      </Button>

      <Dashboard 
        isOpen={isDashboardOpen}    // using renamed state
        onClose={onDashboardClose}  // using renamed function
      />

        </Container>
        <LogoutButton />
    </Stack>
  )
}

export default App
