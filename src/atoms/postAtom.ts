import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post= {

    id: string;
    communityId: string;
    creatorId: string;
    title: string;
    body:string;
    createdAt: Timestamp;
    numberOfComments: number;
    voteStatus: number;
    communityImageURL?: string;
    imageURL:string;
    creatorDisplayName: string;

}

interface PostState{
    selectedPost:Post|null;
    posts:Post[];
}

const defaultPostState: PostState = {
    selectedPost: null,
    posts: [],
}
export const postState = atom<PostState>({
    key: 'postState',
    default: defaultPostState,
})

//If declaring/defining something give semicolon, else give ,