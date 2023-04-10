import { auth } from '../../../firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';



const OAuthButtons:React.FC = () => {

    const[signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)
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