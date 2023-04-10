import { authModalState } from '@/atoms/authModalAtom';
import { Button, Text, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/clientApp'
import { FIREBASE_ERRORS } from '@/firebase/errors';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        userError
    ] = useSignInWithEmailAndPassword(auth);

    //Firebase Logic
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,

        }));
    }

    const handleSignUpClick = () => {

        setAuthModalState((prev) => ({
            ...prev,
            view: "signup"
        }))
    }

    const handleResetPasswordOnClick = () => {
        setAuthModalState((prev) => ({
            ...prev,
            view: "resetPassword"
        }))
    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    name="email"
                    placeholder="email"
                    type="email"
                    mb={2}
                    onChange={handleChange}

                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"


                    }}
                    bg="gray.50"


                />


                <Input
                    name="password"
                    placeholder="password"
                    type="password"
                    mb={2}
                    onChange={handleChange}

                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"


                    }}
                    bg="gray.50"

                />

                <Text textAlign="center" color="red" fontSize="10pt">{FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>

                <Button width="100%" height="36px" type="submit" >Log In</Button>


                <Flex fontSize="9pt" justifyContent="center">
                    <p style={{ marginRight: "1px" }}>Forgot your password? </p>
                    <Text color="blue.500" style={{ fontWeight: "700", cursor: "pointer" }} onClick={handleResetPasswordOnClick}>Reset Here</Text>
                </Flex>

                <Flex fontSize="9pt" justifyContent="center">
                    <p style={{ marginRight: "1px" }}>New here? </p>
                    <Text color="blue.500" style={{ fontWeight: "700", cursor: "pointer" }} onClick={handleSignUpClick}>Sign Up </Text>

                </Flex>

            </form>
        </div>
    )


}
export default Login;