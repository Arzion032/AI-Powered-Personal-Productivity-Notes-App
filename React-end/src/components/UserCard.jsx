import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { BiTrash,BiEditAlt } from "react-icons/bi";
import EditModal from './EditModal';
import DeleteUserModal from './DeleteUserModal'

const UserCard = ({ user, setUsers }) => {
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={user.imgUrl}/>
                        
                        <Box>
                            <Heading size='sm'>{user.name}</Heading>
                            <Text>{user.role}</Text>
                        </Box>
                        
                    </Flex>

                    <Flex gap={2}>
                        <EditModal user={user} setUsers = {setUsers} />
                       <DeleteUserModal user={user} setUsers={setUsers}/>
                        
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>
                    {user.description}
                </Text>
                
            </CardBody>
        </Card>
        );
};

export default UserCard;