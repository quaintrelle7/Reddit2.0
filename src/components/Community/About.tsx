import { Community, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { Flex, Box, Text, Icon, Stack, Divider, Button, Image, Spinner } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaReddit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { RiCakeLine } from "react-icons/ri"
import { useSetRecoilState } from 'recoil';

type AboutProps = {
    communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
    const router = useRouter();

    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null);

    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

    const [uploadingImage, setUploadingImage] = useState(false);

    const setCommunityStateValue = useSetRecoilState(communityState);

    const handleUpdateImage = async () => {
        if (!selectedFile) return;

        setUploadingImage(true);
        try {
            const imageRef = ref(storage, `communities/${communityData.id}/image`);
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "communities", communityData.id), {
                imageURL: downloadURL,
            });

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                } as Community,
            }));

        }
        catch (error) {
            console.log("handleUpdateImage Error", error);
        }

        setUploadingImage(false);
    };

    return (
        <Box position={"sticky"} top={"14px"}>
            <Flex
                bg={"blue.400"}
                color={"white"}
                align={"center"}
                justify={"space-between"}
                p={3}
                borderRadius={"4px 4px 0px 0px"}>

                <Text fontSize={"10pt"} fontWeight={700}>About Community</Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>


            <Flex direction={"column"} p={3} bg={"white"} borderRadius={"0px 0px 4px 4px"}>
                <Stack>
                    <Flex width={"100%"} p={2} fontSize={"10pt"} fontWeight={700}>
                        <Flex direction={"column"} flexGrow={1}>
                            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction={"column"} flexGrow={1}>
                            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>

                    <Divider />
                    <Flex align={"center"} width={"100%"} p={1} fontWeight={500} fontSize={"10pt"}>
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        <Text>Created At {moment(new Date(communityData.createdAt.seconds * 1000)).format("MMM DD, YYYY")}
                        </Text>

                    </Flex>
                    <Link href={`/r/${router.query.communityId}/submit`}>
                        <Button mt={3} height={"30px"} width={"100%"}>
                            Create post
                        </Button>
                    </Link>
                    {user?.uid == communityData.creatorId && (
                        <><Divider />
                            <Stack spacing={2} fontSize={"10pt"}>
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align={"center"} justifyContent={"space-between"}>
                                    <Text color={"blue.500"} cursor={"pointer"} _hover={{ textDecoration: "underline" }}
                                        onClick={() => selectedFileRef.current?.click()}
                                    >Change Image</Text>

                                    {communityData.imageURL || selectedFile ? (
                                        <Image src={selectedFile || communityData.imageURL} borderRadius={"full"} boxSize={"40px"} alt='Community Image' />
                                    ) : (
                                        <Icon as={FaReddit} color={"brand.100"} fontSize={"40px"} mr={2} />
                                    )}
                                </Flex>

                                {selectedFile && (
                                    uploadingImage ? (<Spinner />) : (<Text cursor={"pointer"} onClick={handleUpdateImage}>Save Changes</Text>)
                                )}
                                <input ref={selectedFileRef} type='file' hidden={true}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>

                    )}
                </Stack>
            </Flex>
        </Box>
    )
}
export default About;