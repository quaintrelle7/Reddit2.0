import { authModalState } from '@/atoms/authModalAtom';
import { Button, Text, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/clientApp"
import { FIREBASE_ERRORS } from "../../../firebase/errors"


const SignUp: React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [formError, setFormError] = useState("");

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        userError,
    ] = useCreateUserWithEmailAndPassword(auth);


    //Firebase Logic

    //event.preventDefault s that on Submission of the form the page doesn't refesh

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {


        event.preventDefault();
        if (formError) setFormError("");
        if (signUpForm.password != signUpForm.confirmPassword) {
            //setError
            setFormError("Passwords do not match!");
            return;

        }
        console.log("Hi")

        const userCredential = await createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
        console.log(userCredential)

        // try{
        //  catch(error){
        //     console.log(error)
        // }

        //  createUserWithEmailAndPassword( signUpForm.email, signUpForm.password)
        //     .then((userCredential) => {
        //         // Signed in
        //         console.log(user);
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorCode, errorMessage);
        //         // ..
        //     });

        console.log("Bye")
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,

        }));
    }

    const handleLogInClick = () => {

        setAuthModalState((prev) => ({
            ...prev,
            view: "login"
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
                    _placeholder={{ colot: "gray.500" }}
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
                    _placeholder={{ colot: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"


                    }}
                    bg="gray.50"

                />

                <Input
                    name="confirmPassword"
                    placeholder="confirm password"
                    type="password"
                    mb={2}
                    onChange={handleChange}

                    fontSize="10pt"
                    _placeholder={{ colot: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500"


                    }}
                    bg="gray.50"

                />
                {(formError || userError) && (
                    <Text textAlign="center" color="red" fontSize="10pt">{formError || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}</Text>
                )}
                <Button width="100%" height="36px" type="submit" isLoading={loading} >Sign Up</Button>

                <Flex fontSize="9pt" justifyContent="center">
                    <p style={{ marginRight: "1px" }}>Account exists? </p>
                    <Text color="blue.500" style={{ fontWeight: "700", cursor: "pointer" }} onClick={handleLogInClick}>Log In </Text>


                </Flex>

            </form>
        </div>
    )
}
export default SignUp;