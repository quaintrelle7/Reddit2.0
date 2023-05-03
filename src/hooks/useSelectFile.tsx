import React, { useState } from 'react';


const useSelectFile = () => {

    const [selectedFile, setSelectedFile] = useState<string>();


    const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        //event.target.files is an array, we are taking only one image, the first one

        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);

        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }
    }

    return {
        selectedFile,
        setSelectedFile,
        onSelectFile
    };



}
export default useSelectFile;