import { Community, communityState } from '@/atoms/communitiesAtom';
import About from '@/components/Community/About';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Header from '@/components/Community/Header';
import NotFound from '@/components/Community/NotFound';
import PageContent from '@/components/Layout/PageContent';
import Posts from '@/components/Posts/Posts';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify'


type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    console.log("Here is the data", communityData)

    const setCommunityStateValue = useSetRecoilState(communityState);

    useEffect(() => {
        setCommunityStateValue((prev) => ({
            ...prev,
            currentCommunity: communityData,


        }));
    }, []);

    const communityStateValue = useRecoilValue(communityState);

    console.log("Community", communityStateValue);



    if (!communityData) {
        return (<NotFound />)
    }




    return (<div>Welcome to {communityData.id}

        <Header communityData={communityData} />
        <PageContent>
            <>

                <CreatePostLink />
                <Posts communityData={communityData} />

            </>


            <>
            <About communityData={communityData}/>
            </>
        </PageContent>

    </div>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    //get the community data and pass it to a clinet
    try {
        const communityDocRef = doc(firestore,
            "communities",
            context.query.communityId as string);

        const communityDoc = await getDoc(communityDocRef);

        return {

            //this is the server side rendering
            //this is what the nextJS will pass to the client side
            //as props 

            props: {
                communityData: communityDoc.exists() ?
                    JSON.parse(safeJsonStringify(
                        { id: communityDoc.id, ...communityDoc.data() })
                    ) : "",
            },
        };

    } catch (error) {

        //could add error page here

        console.log('getServerSideProps Error', error)
        // return {
        //     redirect: {
        //         destination: '/',
        //         statusCode: 307
        //     }}

    }
}


export default CommunityPage;