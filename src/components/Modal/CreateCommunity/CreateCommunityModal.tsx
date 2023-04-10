import { Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Box, Stack, Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react';

type CreateCommunityModalProps = {
    open: boolean;

    //callback function that doesn't return anything
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [communityName, setCommunityName] = useState("")
    const [charsRemaining, setCharsRemaining] = useState(21)
    const [communityType, setCommunityType] = useState("public")

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length)
        // alert(communityName)
    }

    return (
        <>

            <Modal isOpen={open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display={"flex"}
                        fontSize={15}
                        padding={3}
                        flexDirection={"column"}

                    >Create a Community
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize={15} fontWeight={600}>
                            Name
                        </Text>
                        <Text fontSize={11} color="gray.500">
                            Community Names including capitalization cannot be changed
                        </Text>
                        <Text position={"relative"} top="28px" left="10px" width="20px">
                            r/
                        </Text>
                        <Input
                            position={"relative"}
                            value={communityName}
                            size="sm"
                            pl="22px"
                            onChange={handleChange}>

                        </Input>
                        <Text
                            fontSize="9pt"
                            color={charsRemaining == 0 ? "red" : "gray.500"}>
                            {charsRemaining} characters remaining</Text>

                        <Box mt={4} mb={4}>
                            <Text fontWeight={600} fontSize={15}>
                                Community Type</Text>

                            {/* //handles spacing between its children Wow Chakra */}
                            <Stack>
                                <Checkbox>Public</Checkbox>
                                <Checkbox>Restricted</Checkbox>
                                <Checkbox>Private</Checkbox>


                                
                            </Stack>
                        </Box>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant="outline" onClick={handleClose} mr={2}>
                            Cancel
                        </Button>
                        <Button>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;