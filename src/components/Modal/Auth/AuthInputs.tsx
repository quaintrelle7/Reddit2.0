import { authModalState } from '@/atoms/authModalAtom';
import { Flex, InputGroup } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Login from './Login';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';



type AuthInputsProps = {


};

const AuthInputs: React.FC<AuthInputsProps> = () => {

    //read about the recoil hooks here we are just fetching vlues so used iseRecoilValue

    const modalState = useRecoilValue(authModalState)
    return (
        <Flex direction="column" width="100%" align="center" mt={5}>
            {modalState.view == "login" && <Login />}
            {modalState.view == "signup" && <SignUp />}
            {modalState.view == "resetPassword" && <ResetPassword />}
        </Flex>
    )

}
export default AuthInputs;