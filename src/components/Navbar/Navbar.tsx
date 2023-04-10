import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import SearchInput from './SearchInput';
import RightContent from './RightContent/RightContent';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Directory from './Directory/Directory';

const Navbar: React.FC = () => {

    const [user, loading, error] = useAuthState(auth);

    return (
        <div>
            <Flex bg="white"
                padding="6px 12px"
                height="44px"
                justifyContent={{ md: "space-between" }}>

                <Image alt="Reddit Logo" src="./Reddit-Logo.png" height="30px" />
                <Directory />
                <SearchInput user = {user}/>
                <RightContent user={user} />
            </Flex>

        </div>)
}
export default Navbar;