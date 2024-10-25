import { Button, Input, Flex, Modal, ModalFooter, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, FormControl, FormLabel,Radio,
	RadioGroup,
	Textarea, useToast } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { useState, useEffect } from "react";

export const BASE_URL = "http://localhost:5000/api";
const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs ] = useState({
        name: '',
        role: '',
        description: '',
        gender: '',
    });  

    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();// prevent page refresh
        setIsLoading(true);
        try{
            const res = await fetch(BASE_URL+'/friends',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
                body: JSON.stringify(inputs),
            })
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            toast({
                title: 'Yayy! 🎉',
                description: "Friend created successfully.",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: "top-center"
            });
            onClose();
            console.log(data)
            setUsers((prevUsers) => [...prevUsers, data]);
            
        } catch(error) {
            toast({
                title: 'OOOPSS!',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: "top-center"
            });
        } finally{
            setIsLoading(false);
            setInputs({
                name: '',
                role: '',
                description: '',
                gender: '',
            });

        }
};
 return <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20}/>
    </Button>

    <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"md"}
        title={"Add a new user"}
    >
        <ModalOverlay />
        <form onSubmit={ handleCreateUser }>
        <ModalContent>
            <ModalHeader>Bagong Hero</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder='' 
                        value={inputs.name}
                                onChange = {(e) => setInputs({...inputs, name: e.target.value})}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input placeholder='' 
                        value={inputs.role}
                        onChange={(e) => setInputs({...inputs, role: e.target.value})}
                        />
                    </FormControl>
                </Flex>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                        resize={"none"}
                        overflowY={"hidden"}
                        placeholder=""
                        value = {inputs.description}
                        onChange = {(e) => setInputs({...inputs, description: e.target.value})}
                        />
                    </FormControl>
                    <RadioGroup  mt={4} >
                        <Flex gap={5}>
                            <Radio value='male' onChange = {(e) => setInputs({...inputs, gender: e.target.value})}>Male</Radio>
                            <Radio value='female' onChange = {(e) => setInputs({...inputs, gender: e.target.value})}>Female</Radio>
                        </Flex>
                    </RadioGroup>
            </ModalBody >

            <ModalFooter>
                <Button colorScheme='blue' mr={3} type ="submit" isLoading = {isLoading}>
                        Add
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </form>
    </Modal>
 </>
};

export default CreateUserModal;