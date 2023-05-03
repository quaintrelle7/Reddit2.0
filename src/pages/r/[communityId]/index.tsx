import { Community } from '@/atoms/communitiesAtom';
import CreatePostLink from '@/components/Community/CreatePostLink';
import Header from '@/components/Community/Header';
import NotFound from '@/components/Community/NotFound';
import PageContent from '@/components/Layout/PageContent';
import Posts from '@/components/Posts/Posts';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify'


type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    console.log("Here is the data", communityData)

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


            <><div>RHS</div></>
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