import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';

import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { Post } from '@/atoms/postAtom';
import { Timestamp, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useSelectFile from '@/hooks/useSelectFile';

type NewPostFormProps = {

    user: User;
};

const formTabs: TabItem[] = [
    {
        title: "Post",
        icon: IoDocumentText,
    },
    {
        title: "Image & Video",
        icon: IoImageOutline,
    }, {
        title: "Link",
        icon: BsLink45Deg,
    }, {
        title: "Poll",
        icon: BiPoll,
    }, {
        title: "Talk",
        icon: BsMic,
    },

]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;

};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {

    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [error, setError] = useState(false);

    const [textInputs, setTextInputs] = useState(
        {
            title: "",
            body: "",
        }
    )

    const [loading, setLoading] = useState(false);
    // const [selectedFile, setSelectedFile] = useState<string>();

    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

    const handleCreatePost = async () => {
        const { communityId } = router.query;

        //create a new post object type : Post

        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        }

        //Store the post in DB

        setLoading(true);

        try {

            const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

            if (selectedFile) {
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);

                await uploadString(imageRef, selectedFile, 'data_url');

                const downloadURL = await getDownloadURL(imageRef);

                await updateDoc(postDocRef, {
                    imageURL: downloadURL,

                });

                console.log(downloadURL)

            }
            router.back();


        } catch (error: any) {
            console.log("handleCreatePostError", error.message);
            setError(true);
        }

        setLoading(false);

        //redirect the bage to communityHomePage

    }

    //created image out of this

    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const reader = new FileReader();

    //     //event.target.files is an array, we are taking only one image, the first one

    //     if (event.target.files?.[0]) {
    //         reader.readAsDataURL(event.target.files[0]);

    //     }

    //     reader.onload = (readerEvent) => {
    //         if (readerEvent.target?.result) {
    //             setSelectedFile(readerEvent.target.result as string);
    //         }
    //     }
    // }

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = event;
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Flex direction={"column"} bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (

                    <TabItem key={item.title}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab} />

                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab == "Post" && (<TextInputs textInputs={textInputs}
                    onChange={handleTextChange}
                    handleCreatePost={handleCreatePost}
                    loading={loading}
                />)}

                {selectedTab == "Image & Video" && (<ImageUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile} setSelectedTab={setSelectedTab} onSelectImage={onSelectFile} />)}


            </Flex>

            {true && (
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle fontWeight={200}>Error Creating Post</AlertTitle>

                </Alert>
            )}



        </Flex>
    )
}
export default NewPostForm;