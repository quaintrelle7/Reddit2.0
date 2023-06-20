import { authModalState } from '@/atoms/authModalAtom';
import { communityState } from '@/atoms/communitiesAtom';
import { Post, PostVote, postState } from '@/atoms/postAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { WriteBatch, collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';



const usePosts = () => {

    const [user] = useAuthState(auth);
    const router = useRouter();
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;
    const setAuthModalState = useSetRecoilState(authModalState);

    const onVote = async (event: React.MouseEvent<SVGElement, MouseEvent>, post: Post, vote: number, communityId: string) => {
        event.stopPropagation();

        if (!user?.uid) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }

        try {

            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find((vote) => (vote.postId == post.id))

            const batch = writeBatch(firestore);

            //Copies to update the data in frontend
            const updatedPost = { ...post };
            const updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;





            //Person is voting the post for the very first time

            if (!existingVote) {

                const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id,
                    communityId: communityId,
                    voteValue: vote,
                }

                batch.set(postVoteRef, newVote);

                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];

            } else {

                const postVoteRef = doc(
                    firestore, "users",
                    `${user?.uid}/postVotes/${existingVote.id}`
                );

                //Person wants to remove their Vote
                if (existingVote.voteValue == vote) {
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter((vote) => (vote.id !== existingVote.id));

                    batch.delete(postVoteRef);

                    voteChange *= -1;

                } else {
                    //Person Wants to flip their vote

                    updatedPost.voteStatus = voteStatus + 2 * vote;
                    const voteIdx = postStateValue.postVotes.findIndex((vote) => vote.id === existingVote.id);

                    updatedPostVotes[voteIdx] = {
                        ...existingVote,
                        voteValue: vote,
                    }

                    //update the existing postVote Document

                    batch.update(postVoteRef, {
                        voteValue: vote,
                    });

                    voteChange = 2 * vote;


                }
            }

            //update the postvoteRef




            //Update the state with updated post values
            const postIdx = postStateValue.posts.findIndex((item) => item.id === post.id);

            updatedPosts[postIdx] = updatedPost;

            setPostStateValue((prev) => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes,

            }))

            if (postStateValue.selectedPost) {
                setPostStateValue((prev) => ({
                    ...prev,
                    selectedPost: updatedPost,
                }))
            }

            const postRef = doc(firestore, "posts", post.id!);
            batch.update(postRef, { voteStatus: voteStatus + voteChange });

            await batch.commit();


        } catch (error) {
            console.log("OnVote Error", error);
        }



    };

    const onSelectPost = (post: Post) => {
        setPostStateValue((prev) => (
            {
                ...prev,
                selectedPost: post
            }
        ));

        router.push(`/r/${post.communityId}/comments/${post.id}`);
    };


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



    const getCommunityPostVotes = async (communityId: string) => {

        const postVotesQuery = query(

            collection(firestore, "users", `${user?.uid}/postVotes`), where("communityId", "==", communityId)
        );

        const postVotesDocs = await getDocs(postVotesQuery);
        const postVotes = postVotesDocs.docs.map((doc) => ({
            if: doc.id,
            ...doc.data(),
        }));

        setPostStateValue((prev) => ({
            ...prev,
            postVotes: postVotes as PostVote[],
        }));
    };


    //Trigger useEffect everytime the dependency (user or currentCommunity ) Changes

    useEffect(() => {
        if (!user || !currentCommunity?.id) return;
        getCommunityPostVotes(currentCommunity?.id);


    }, [user, currentCommunity])

    useEffect(() => {

        if (!user) {
            //clear user post votes

            setPostStateValue((prev) => ({
                ...prev,
                postVotes: [],
            }))
        }
    }, [user])

    return {
        postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost
    };

};
export default usePosts;