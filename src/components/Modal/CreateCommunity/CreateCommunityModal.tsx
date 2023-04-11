import { auth, firestore } from '@/firebase/clientApp';
import { Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Box, Stack, Checkbox, HTMLChakraComponents } from '@chakra-ui/react';
import { doc, getDoc, getDocFromCache, getDocFromServer, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open: boolean;

    //callback function that doesn't return anything
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [communityNameError, setCommunityNameError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length > 21) return;
        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length)
        // alert(communityName)
    }

    const handleCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setCommunityType(event.target.name);

    }

    const handleCreateCommunity = async () => {

        if (communityNameError) setCommunityNameError("");

        var regex = /[!@#\$%\^\&*\)\(+=._-]+$/g

        if (regex.test(communityName) || communityName.length < 3) {
            return setCommunityNameError("Community name must not contain any special chracter and must be between 3-21 chars")
        }


        setLoading(true);

        try {
            const communityDocRef = doc(firestore, "communities", communityName)
            const communityDoc = await getDoc(communityDocRef)

            if (communityDoc.exists()) {
                throw new Error(`r/${communityName} has been taken, try another`);

            }



            //validate the community name
            //Create the community in document firestore

            //setDoc is the function from firebase to create 
            // or update the document

            await setDoc(communityDocRef, {
                creatorId: user?.uid,
                creatorAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType,

            });

            // await runTransaction(firestore, async (transaction) => {
            //     const communityDoc = await transaction.get(communityDocRef);
            //     if (communityDoc.exists()) {
            //         throw new Error(`Sorry, /r${name} is taken. Try another.`);
            //     }

            //     transaction.set(communityDocRef, {
            //         creatorId: user?.uid,
            //         createdAt: serverTimestamp(),
            //         numberOfMembers: 1,
            //         privacyType: "public",
            //     });

            // transaction.set(
            //     doc(firestore, `users/${userId}/communitySnippets`, name),
            //     {
            //         communityId: name,
            //         isModerator: true,
            //     }
            // );
            // });  



        } catch (error: any) {
            console.log("handlecreateCommunity Error", error)
            setCommunityNameError(error.message)
        }

        setLoading(false);

    };

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
                        <Text
                            fontSize="9pt"
                            color="red" >
                            {communityNameError}</Text>

                        <Box mt={4} mb={4}>
                            <Text fontWeight={600} fontSize={15}>
                                Community Type</Text>

                            {/* //handles spacing between its children Wow Chakra */}
                            <Stack>
                                <Checkbox name="public" isChecked={communityType == 'public'} onChange={handleCommunityTypeChange}>Public</Checkbox>

                                <Checkbox name="restricted" isChecked={communityType == 'restricted'} onChange={handleCommunityTypeChange} >Restricted</Checkbox>
                                <Checkbox name="private" isChecked={communityType == 'private'} onChange={handleCommunityTypeChange}>Private</Checkbox>
                            </Stack>
                        </Box>

                    </ModalBody>

                    <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
                        <Button variant="outline" height="30px" onClick={handleClose} mr={2}>
                            Cancel
                        </Button>
                        <Button height="30px" onClick={handleCreateCommunity}>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default CreateCommunityModal;