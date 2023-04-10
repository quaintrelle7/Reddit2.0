import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuButton, MenuList, Icon, Text, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from "react-icons/ti"
import Communities from './Communities';


const UserMenu: React.FC = ({ }) => {

    return (
        <Menu >
            <MenuButton cursor="pointer"
                padding="0px 6px"
                borderRadius={4}
                _hover={{ outlien: "1px solid", outlineColor: "gray.200", }}
                mr={2}
                ml={{ base: 1, md: 2 }}>

                <Flex alignItems="center"
                    justify="space-between"
                    width={{ base: "auto", lg: "200px" }}>

                    <Flex alignItems="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                        <Flex display={{ base: "none", lg: "flex" }}>
                            <Text fontWeight={600} fontSize={10}>Home</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>


            <MenuList>
                <MenuItem >
                <Communities/>
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
export default UserMenu;