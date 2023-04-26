import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?: string;
    //? here refers optional as user may or may not selecte the file
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: string) => void;
    setSelectedFile: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, onSelectImage, setSelectedTab, setSelectedFile }) => {

    const selectedFileRef = useRef<HTMLInputElement>(null);

    return (
        <Flex
            direction={'column'}
            justify={'center'}
            align={'center'}
            width={'100%'}>

            {selectedFile ? (
                <>
                    <Image src={selectedFile} maxHeight={"400px"} maxWidth={"400px"} alt="uploaded image" />

                    <Stack direction={'row'} mt={4}>
                        <Button height="28px" onClick={() => setSelectedTab('Post')}>Back to Post</Button>
                        <Button variant={'outline'} height="28px" onClick={() => setSelectedFile('')}>Remove</Button>
                    </Stack>
                </>

            ) : (<Flex justify={'center'}
                align={'center'}
                width={'100%'}
                p={20}
                border={"1px dashed"}
                borderColor={"gray.200"}
                borderRadius={5}
            >

                <Button variant={'outline'}
                    height="28px"
                    onClick={() => selectedFileRef.current?.click()}>

                    Upload

                </Button>
                <input ref={selectedFileRef} type='file' hidden={true}
                    onChange={onSelectImage}
                />

            </Flex>)}

        </Flex>
    )
}
export default ImageUpload;