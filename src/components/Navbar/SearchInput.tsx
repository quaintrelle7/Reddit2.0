import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { User } from 'firebase/auth';
import {SearchIcon} from "@chakra-ui/icons";

type SearchInputProps = {

  user?: User | null;
};

 export const SearchInput:React.FC<SearchInputProps> = ({user}) => {
    
    return( 

    <Flex flexGrow={1} mx={2}  align={"center"
    }>
         <InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.400' mb={2} />}
    />
    <Input  placeholder='Search Reddit'
            fontSize="10pt"
            _placeholder={{color:"gray.500"}}
            _hover={{
                bg:"white",
                border:"1px solid",
                borderColor:"blue.500",
            }}
            _focus={{
                outline:"none",
                border:"1px solid",
                borderColor:"blue.500",
            }}
            height="34px"
            bg="gray.50"
    />
  </InputGroup>

    </Flex>
    
    )
}
export default SearchInput;