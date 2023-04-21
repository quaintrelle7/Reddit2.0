import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Community, CommunityState } from '@/atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import { getDocs, collection } from 'firebase/firestore';


const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] =
        useRecoilState(CommunityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user] = useAuthState(auth);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        //Is the user signed In?
        //If not => Open Auth model
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

        } catch (error) {
            console.log("getMySnippets Error", error);
        }
    }
    const joinCommunity = (communityData: Community) => { };
    const leaveCommuntiy = (communityId: string) => { };

    //the below useEffect hook has dependency in the user, everytime 
    //the user chanes, it'll render and so will call the getSnippets function
    
    useEffect(()=>{

        if(!user) return;
        getMySnippets();
    },[user])
    
    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
    }
}
export default useCommunityData;