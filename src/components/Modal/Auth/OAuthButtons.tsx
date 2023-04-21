import { setDoc } from '@firebase/firestore';
import { auth, firestore } from '../../../firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { doc } from 'firebase/firestore';



const OAuthButtons:React.FC = () => {

    const[signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)
    const createUserDocument = async(user: User) =>{
        const userDocRef = doc(firestore, 'users', user.uid)
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));

    };

    useEffect(()=>{
        if(userCred)
        {
            createUserDocument(userCred.user);
        }
    }, [userCred])
    return (
        <>
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" isLoading={loading} onClick={()=>signInWithGoogle()} >
                <Image alt="google image" src="./Google-Logo.png" height="40px"/>
                Continue With Google </Button>
                {error && <Text>{error.message}</Text>}
        </Flex>
        </>
    )
}
export default OAuthButtons;