import React from 'react';
import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';

type PageContentProps = {

};

const PageContent: React.FC<PageContentProps> = ({ children}) => {
    console.log("CHILDRENNNNNNNNNNNNNNN", children)
    return (
        <Flex>
            <Flex justify={"center"} width={""} maxWidth={"860px"}>
                {/* LHS */}
                <Flex>
                    {children && children[0 as keyof typeof children]}
                </Flex>

                {/* RHS */}
                <Flex>
                    {children && children[1]}
                </Flex>
            </Flex>
        </Flex>
    )
}
export default PageContent;