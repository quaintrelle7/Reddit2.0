import { Post } from '@/atoms/postAtom';
import { Flex, Icon, Stack, Text, Image, Skeleton, Spinner } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { IoArrowBackCircleOutline, IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai'
import { parseJsonText } from 'typescript';

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onSelectPost: () => void;

    //Js says async function can only return the promise
    onDeletePost: (post: Post) => Promise<Boolean>;
};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onSelectPost, onDeletePost }) => {

    const [loadingImage, setLoadingImage] = useState(true);
    const [error, setError] = useState("")
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleDelete = async () => {

        setLoadingDelete(true);
        try {

            //Js says async function can only return the promise
            const success = await onDeletePost(post);

            if (!success) {
                throw new Error("Failed to delete the Post");
            }

            console.log("Post successfully deleted!");

        } catch (error: any) {
            //setError
            setError(error.message);

        }

        setLoadingDelete(false);
    }
    return (
        <Flex bg='white' border={"1px solid"} borderColor={"gray.300"} borderRadius={4} _hover={{ borderColor: "gray.500" }}
            cursor={"pointer"} onClick={onSelectPost}>
            <Flex direction={"column"}
                align={"center"}
                bg={"gray.100"}
                p={2}
                width={"40px"}
                borderRadius={4}>
                <Icon as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                    fontSize={"22px"}
                    onClick={onVote}
                    cursor={"pointer"}

                />
                <Text fontSize={"9pt"}>{post.voteStatus}</Text>
                <Icon as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? "4379ff" : "gray.400"}
                    fontSize={"22px"}
                    onClick={onVote}
                    cursor={"pointer"} />
            </Flex>

            <Flex direction={"column"} width={"100%"}>
                <Stack spacing={1}
                    p={"10px"} >
                    <Stack direction={"row"}
                        fontSize={"9pt"}
                        spacing={0.6}
                        align={"center"}>

                        {/* Home Page check COndition */}
                        <Text>Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>
                    <Text fontSize={"12pt"} fontWeight={600}>{post.title}</Text>
                    <Text fontSize={"10pt"}>{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify={"center"} align={"center"} p={2}>

                            {loadingImage && (
                                <Skeleton height="150px" mt={4} />
                            )}

                            <Image src={post.imageURL} maxHeight={"460px"} alt='Post Image' onLoad={() => setLoadingImage(false)} />
                        </Flex>
                    )}
                </Stack>

                <Flex ml={1} mb={0.5} color={"gray"} fontWeight={1}>
                    <Flex align={"center"} p={"8px 10px"} borderRadius={4} cursor={"pointer"} _hover={{ bg: "gray.200" }}>
                        <Icon as={BsChat} mr={1} />
                        <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
                    </Flex>

                    <Flex align={"center"} p={"8px 10px"} borderRadius={4} cursor={"pointer"} _hover={{ bg: "gray.200" }}>
                        <Icon as={IoArrowRedoOutline} mr={1} />
                        <Text fontSize={"9pt"}>Share</Text>
                    </Flex>

                    <Flex align={"center"} p={"8px 10px"} borderRadius={4} cursor={"pointer"} _hover={{ bg: "gray.200" }}>
                        <Icon as={IoBookmarkOutline} mr={1} />
                        <Text fontSize={"9pt"}>Save</Text>
                    </Flex>

                    {userIsCreator && (
                        <Flex align={"center"} p={"8px 10px"} borderRadius={4} cursor={"pointer"} _hover={{ bg: "gray.200" }}
                            onClick={handleDelete}>
                            {loadingDelete ? (
                                <Spinner size={"sm"} />
                            ) : (
                                <>
                                    <Icon as={AiOutlineDelete} mr={1} />
                                    <Text fontSize={"9pt"}>Delete</Text>
                                </>
                            )}
                        </Flex>
                    )}
                </Flex>

            </Flex>


        </Flex >
    )
}
export default PostItem;