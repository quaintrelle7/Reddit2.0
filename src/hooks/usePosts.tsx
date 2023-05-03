import { Post, postState } from '@/atoms/postAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';



const usePosts = () => {

    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    const onVote = async () => { };

    const onSelectPost = () => { };


    //Note: Since the type of this function is asynchronous we are wrapping the return type in Promise

    const onDeletePost = async (post: Post): Promise<Boolean> => {
        try {
            //check if image exists, if yes delete

            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`)
                await deleteObject(imageRef);
            }
            //delete the post from firestore

            const postDocRef = doc(firestore, "posts", post.id);
            await deleteDoc(postDocRef);
            //update the recoil state

            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id),
            }))
            return true;

        } catch (error: any) {
            return false;
        }
    };

    return {
        postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost
    };

};
export default usePosts;