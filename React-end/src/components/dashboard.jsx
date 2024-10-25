// components/Dashboard.jsx
import React from 'react';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  List,
  ListItem,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  ActivitySquare, 
  TrendingUp 
} from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon }) => (
    <Box 
      bg="red.500" 
      p={6} 
      rounded="lg" 
      color="white"
      h="full"
    >
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Stat>
          <StatLabel fontSize="sm" opacity={0.9}>{title}</StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold" mt={2}>{value}</StatNumber>
        </Stat>
        <Icon size={24} opacity={0.8} />
      </Flex>
    </Box>
  );

const Dashboard = ({ isOpen, onClose }) => {
  const chartBg = useColorModeValue('blue.800', 'blue.700');
  
  return (
    <Drawer
    isOpen={isOpen}
    placement="left"
    onClose={onClose}
    size="full"

  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader borderBottomWidth="1px">Dashboard</DrawerHeader>
      <DrawerBody>
        
    <Grid
    templateColumns="repeat(12, 1fr)"
    gap={4}
    bg={useColorModeValue('gray.100', 'gray.800')}
    p={4}
    maxW="10xl"
    mx="auto"
  >
    {/* Top row - Key metrics */}
    <GridItem colSpan={4}>
      <DashboardCard 
        title="Total Users"
        value="12,345"
        icon={Users}
      />
    </GridItem>
    <GridItem colSpan={4}>
      <DashboardCard 
        title="Revenue"
        value="$45,678"
        icon={DollarSign}
      />
    </GridItem>
    <GridItem colSpan={4}>
      <DashboardCard 
        title="Orders"
        value="892"
        icon={ShoppingCart}
      />
    </GridItem>
    

    {/* Middle row - Activity and Sales */}
    <GridItem colSpan={8}>
      <Box bg="blue.900" rounded="lg" p={6} h="full" color="white">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md">Activity Overview</Heading>
          <ActivitySquare size={20} />
        </Flex>
        <Box>
          <Text fontSize="sm" opacity={0.9} mb={4}>Daily Active Users</Text>
          <Box 
            bg={chartBg} 
            rounded="lg" 
            h="200px" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            Chart Area
          </Box>
        </Box>
      </Box>
    </GridItem>
    <GridItem colSpan={4}rowSpan={2}>
      <DashboardCard 
        title="Growth"
        value="+24.8%"
        icon={TrendingUp}
      />
    </GridItem>

    {/* Bottom row - Additional metrics */}
    <GridItem colSpan={4}>
      <Box bg="red.500" rounded="lg" p={6} h="full" color="white">
        <Heading size="md" mb={4}>Quick Stats</Heading>
        <List spacing={3}>
          <ListItem>
            <Flex justify="space-between">
              <Text>Conversion Rate</Text>
              <Text>3.24%</Text>
            </Flex>
          </ListItem>
          <ListItem>
            <Flex justify="space-between">
              <Text>Avg. Order Value</Text>
              <Text>$85.20</Text>
            </Flex>
          </ListItem>
        </List>
      </Box>
    </GridItem>
    <GridItem colSpan={4}>
      <Box bg="blue.900" rounded="lg" p={6} h="full" color="white">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="md">Sales Analytics</Heading>
          <BarChart3 size={20} />
        </Flex>
        <Box 
          bg={chartBg} 
          rounded="lg" 
          h="200px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
        >
          Sales Chart Area
        </Box>
      </Box>
    </GridItem>
  </Grid>  </DrawerBody>
      </DrawerContent>
    </Drawer>
);
};

export default Dashboard;