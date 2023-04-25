import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Text, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { User, signOut } from "firebase/auth"
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { FaRedditSquare } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc"
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { auth } from '@/firebase/clientApp';
import { MdOutlineLogin } from 'react-icons/md'
import { CommunityState } from '@/atoms/communitiesAtom';

type UserMenuProps = {

    user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    
    const resetCommunityState = useResetRecoilState(CommunityState);

    const handleSignOutOnClick = async() => {
        await signOut(auth)
        //clear community State
        resetCommunityState();
    }

    const setAuthModalState = useSetRecoilState(authModalState)


    const handleLogInClick = () => {

        setAuthModalState(() => ({
            open: true,
            view: "login"
        }))
    }


    return (
        <Menu >
            <MenuButton cursor="pointer"
                padding="0px 6px"
                borderRadius={4}
                _hover={{ outlien: "1px solid", outlineColor: "gray.200" }}>

                <Flex alignItems="center">
                    <Flex alignItems="center">
                        {user ? (<>
                            <Icon fontSize={24} mr={1} as={FaRedditSquare} />
                            <Flex
                                direction="column"
                                display={{ base: "none", lg: "flex" }}
                                fontSize={"8pt"}
                                align={"flex-start"}
                                mx={2}>

                                <Text fontWeight={700}>
                                    {user.displayName || user.email?.split("@")[0]}
                                </Text>
                                <Flex align={"center"}>
                                    <Icon mr={1} color="brand.100" as={IoSparkles} />
                                    <Text color="gray.400">1 Karma</Text>
                                </Flex>
                            </Flex>
                        </>)

                            : (
                                <Icon fontSize={24} mr={1} as={VscAccount} />
                            )

                        }

                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>


            <MenuList>
                {user ? (<><MenuItem
                    fontSize={'10pt'}
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white" }}
                >
                    <Flex align="center">
                        <Icon as={CgProfile} fontSize={20} mr={2} />
                        Profile
                    </Flex>
                </MenuItem>
                    <MenuItem
                        fontSize={'10pt'}
                        fontWeight={700}
                        _hover={{ bg: "blue.500", color: "white" }}
                        onClick={handleSignOutOnClick}
                    >
                        <Flex align="center">
                            <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                            Log Out
                        </Flex>
                    </MenuItem>
                </>) : (
                    <><MenuItem
                        fontSize={'10pt'}
                        fontWeight={700}
                        _hover={{ bg: "blue.500", color: "white" }}
                    >
                        <Flex align="center">
                            <Icon as={CgProfile} fontSize={20} mr={2} />
                            Profile
                        </Flex>
                    </MenuItem>
                        <MenuItem
                            fontSize={'10pt'}
                            fontWeight={700}
                            _hover={{ bg: "blue.500", color: "white" }}
                            onClick={handleLogInClick}
                        >
                            <Flex align="center">
                                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                                Log In/Sign Up
                            </Flex>
                        </MenuItem></>
                )}
            </MenuList>
        </Menu>
    )
}
export default UserMenu;