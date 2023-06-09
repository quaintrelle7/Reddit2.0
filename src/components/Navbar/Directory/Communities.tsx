import CreateCommunityModal from '@/components/Modal/CreateCommunity/CreateCommunityModal';
import { Text, Flex, Icon, MenuItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {

};

const Communities: React.FC<CommunitiesProps> = () => {

    const[open, setOpen] = useState(false)
     return (
        <>
            <CreateCommunityModal open={open} handleClose={()=>setOpen(false)} />
            <MenuItem onClick = {()=>setOpen(true)} fontSize={10} _hover={{bg:"gray.100"}} >
                <Flex align="center">
                    <Icon  fontSize = {20} mr ={2} as={GrAdd} />
                    <Flex>
                        <Text>Create a Community</Text>
                    </Flex>

                </Flex>
            </MenuItem>
        </>
    )
}
export default Communities;