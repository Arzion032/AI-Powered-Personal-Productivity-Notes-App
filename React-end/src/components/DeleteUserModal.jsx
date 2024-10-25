import { BiTrash } from "react-icons/bi";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Toast, useDisclosure, useToast } from "@chakra-ui/react";
import { BASE_URL } from "./createUserModal";
import { useState } from "react";

const DeleteUserModal = ({ user, setUsers }) => {
  const [isLoading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();
    
    const handleDelete = async () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({id: user.id}),
      }
        try{
        const res =  await fetch(BASE_URL +`/delete_friend/${user.id}`, options)
        const data = await res.json();

        
        if(!res.ok){
          throw new Error(data.error);}
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        toast({
          title: 'Yayy! 🎉🎉',
          description: "Friend deleted successfully.",
          status:'success',
          duration: 4000,
          isClosable: true,
          position: "top-center"
        } );
      } catch (error){
        toast({
          title: 'OOOPSS!',
          description: data.error,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "top-center"
      });

        } finally{
          setIsLoading(true);
          onClose();
        }
    }


    return <>
    <Button onClick={onOpen}>
        <BiTrash size={20}/>
    </Button>
    
    <Modal isOpen={isOpen} onClose={onClose} isCentered
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This action will permanently delete the selected item. Do you want to proceed?
          </ModalBody>

          <ModalFooter>
          <Button isLoading = {isLoading} colorScheme='red' mr={3} onClick={handleDelete}>
              Yes
            </Button>
            <Button  mr={3} onClick={onClose}>
              No
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>


};

export default DeleteUserModal;