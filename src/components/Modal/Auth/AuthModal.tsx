import { AuthModalState, authModalState } from '@/atoms/authModalAtom';
import { Button, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';


const AuthModal = () => {

  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {

    setModalState((prev) => ({
      ...prev,
      open: false,


    }));
  };

  useEffect(() => {
    if (user) handleClose();

    console.log("user", user)
  }, [user]);


  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">{modalState.view == "login" && "Login"}
            {modalState.view == "signup" && "SignUp"}
            {modalState.view == "resetPassword" && "Reset Password"}

          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pb={8}

          >

            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="70%"

            >

              {modalState.view === "login" || modalState.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color="gray.500" fontWeight={700}>OR</Text>
                </>

              ) : (<></>)}




              <AuthInputs />
              {/* <ResetPassword/> */}
            </Flex>

          </ModalBody>


        </ModalContent>
      </Modal>

    </>
  )
}
export default AuthModal;