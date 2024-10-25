import { Button, Input, Flex, Modal, ModalFooter, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel,Radio,
	RadioGroup,
	Textarea,
    useToast, } from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "./createUserModal";


const EditModal = ({ user, setUsers }) => {
const toast = useToast();
const [selectedUser, setSelectedUser] = useState({
    name: user.name,
    role: user.role,
    description: user.description,
    gender: user.gender
    
})

const updateSelectedUser = async (e) => {
    e.preventDefault();
    try{
        const res = await fetch(`${BASE_URL}/update_friend/${user.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify(selectedUser)
        });
        if(!res.ok){
            throw new Error('Failed to update user');
        }
        const data = await res.json();
        onClose();
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === data.id ? { ...user, ...data } : user
            )
          );
        toast({
            title: 'User Updated',
            description: "User updated successfully!",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top-center"
        });

    }catch(err){
        toast({
            title: 'OOOPSS!',
            description: err.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: "top-center"
        });
    }
}

const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
    <Button onClick={onOpen}>
        <BiEditAlt size={20}/>
    </Button>
    
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"md"}
        title={"Add a new user"}
    >

        <ModalOverlay />
        <form onSubmit={updateSelectedUser}>
        <ModalContent>
            <ModalHeader>Bagong Hero</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input value= {selectedUser.name} onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input value={selectedUser.role} onChange={(value) => setSelectedUser({...selectedUser, role: value.target.value})}/>
                    </FormControl>
                </Flex>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                        resize={"none"}
                        overflowY={"hidden"}
                        value= {selectedUser.description}
                        onChange={(e) => setSelectedUser({...selectedUser, description: e.target.value})}
                        />
                    </FormControl>
                    <RadioGroup value={selectedUser.gender} mt={4} >
                        <Flex gap={5}>
                            <Radio value='male' onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}>Male</Radio>
                            <Radio value='female' onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}>Female</Radio>
                        </Flex>
                    </RadioGroup>
               
            </ModalBody >

            <ModalFooter>
                <Button type="submit" colorScheme='blue' mr={3}>
                        Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </form>
    </Modal>
 </>
}
export default EditModal;