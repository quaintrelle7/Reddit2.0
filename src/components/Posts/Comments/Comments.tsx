import { Post } from '@/atoms/postAtom';
import { Flex, Box } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';

type CommentsProps = {

    user: User,
    selectedPost: Post,
    communityId: string,
};

const Comments: React.FC<CommentsProps> = (
    { user,
        selectedPost,
        communityId }
) => {

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [createLoading, setCreateloading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const onCreateComment = async (CommentText: string) => { }

    const onDeleteComment = async (Comment: any) => {

    }

    const getPostComments = async () => {


    }

    useEffect(() => {
        getPostComments();
    }, [])

    return (
        <Box bg="white" p={2}>
            <Flex
                direction={"column"}
                pl={10} pr={4}
                mb={6} fontSize={100}
                width={"!00%"}>

                <CommentInput commentText={commentText} setCommentText={setCommentText} user={user} createLoading={createLoading} onCreateComment={onCreateComment} />

            </Flex>
        </Box>
    )
}
export default Comments;