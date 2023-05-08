import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt: Timestamp;
  imageURL?: string;
  creatorId: string;
}

export interface CommunitySnippet {
  communityId?: string;
  ismoderator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community;
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});
