import { SkeletonCircle, SkeletonText, Box, Skeleton } from '@chakra-ui/react';
import React from 'react';

type PostLoaderProps = {

};

const PostLoader: React.FC<PostLoaderProps> = () => {

    return (
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />

            <Skeleton height="150px" mt={4}>

            </Skeleton>
        </Box>
    )
}
export default PostLoader;