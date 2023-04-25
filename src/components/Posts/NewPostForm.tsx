import { Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { BiPoll } from 'react-icons/bi';

import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import TabItem from './TabItem';
import TextInputs from './PostForm/TextInputs';

type NewPostFormProps = {

};

const formTabs = [
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

const NewPostForm: React.FC<NewPostFormProps> = () => {

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, settextinputs] = useState(
        {
            title: "",
            body: "",
        }
    )
    const [selectedFile, setSelectedFile] = useState<string>();

    const handleCreatePost = () => { }

    const handleImageUpload = () => { }

    const handleTextChange = () => { }

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
                    loading={true}
                />)}

            </Flex>
        </Flex>
    )
}
export default NewPostForm;