import React from 'react';
import AuthButtons from './AuthButtons';
import { Flex, useDisclosure, Button } from '@chakra-ui/react';
import AuthModal from '@/components/Modal/Auth/AuthModal';
import { signOut, User } from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {

    const handleSignOutOnClick = () => {
        signOut(auth)
    }
    return (
        <>
            <AuthModal />
            <Flex justifyContent="center" alignItems="center">
                {/* { user? <Button onClick={handleSignOutOnClick}>Log Out</Button>: <AuthButtons/>} */}
                {/* <Menu/> */}
                {user ? <Icons /> : <AuthButtons />}
                <UserMenu user={user} />

            </Flex>

        </>
    )
}
export default RightContent;