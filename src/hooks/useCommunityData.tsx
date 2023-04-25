import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Community, CommunitySnippet, CommunityState } from '@/atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { getDocs, doc, collection, increment } from 'firebase/firestore';
import { WriteBatch, writeBatch } from 'firebase/firestore';
import { authModalState } from '@/atoms/authModalAtom';

const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(CommunityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        //Is the user signed In?
        //If not => Open Auth model

        if(!user)
        {
            setAuthModalState({open:true, view: "login"});
            return;
        }
        setLoading(true);
        if (isJoined) {
            leaveCommuntiy(communityData.id);
            return;
        }
        joinCommunity(communityData);

    };

    const getMySnippets = async () => {
        setLoading(true);

        try {
            //get users snippets
            const snippetDocs = await getDocs
                (collection(firestore, `users/${user?.uid}/communitySnippets`));

            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data() }));
            console.log("here are snippets", snippets);
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }))

        } catch (error: any) {
            console.log("getMySnippets Error", error);
            setError(error.message);
        }

        setLoading(false);
    }
    const joinCommunity = async (communityData: Community) => {

        //Batch Write    
        //creating a community Snippets
        //updating the number of memebrs on community page n DB
        //Update UI
        //update recoil state = communityState.mySnippets

        try {
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            };

            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id,
                ), newSnippet);

            batch.update(
                doc(
                    firestore,
                    "communities",
                    communityData.id,
                ),
                { numberOfMembers: increment(1) });


            await batch.commit();

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }));

            setLoading(false);


        } catch (error: any) {
            console.log("joinCommunity Error", error);
            setError(error.message);
        }

    };
    const leaveCommuntiy = async (communityId: string) => {

        //Batch Write
        //deleting the community snippet from users
        //updating the number of memebrs on community page n DB
        //Update recoil state

        try {

            const batch = writeBatch(firestore);
            batch.delete(doc(firestore,
                `users/${user?.uid}/communitySnippets`,
                communityId));

            batch.update(
                doc(
                    firestore,
                    "communities",
                    communityId,
                ),
                { numberOfMembers: increment(-1) });

            await batch.commit();

            //Update recoil state
            //keep all the snippets with values not having communityId equal to passed communityId

            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets].filter(item=>item.communityId!==communityId),
            }));

            setLoading(false);

        } catch (error: any) {
            console.log("leaveCommunityError", error)
            setError(error.message);
        }
    };

    //the below useEffect hook has dependency in the user, everytime 
    //the user chanes, it'll render and so will call the getSnippets function

    useEffect(() => {

        if (!user) return;
        getMySnippets();
    }, [user])

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,
    }
}
export default useCommunityData;