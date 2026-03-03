
export interface FileAttachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string;
  color: string;
  developer?: string;
}

export interface User {
  username: string;
  password?: string;
  name: string;
}

// Community Types
export interface SurveyOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

export interface Survey {
  question: string;
  options: SurveyOption[];
  totalVotes: number;
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'file';
  fileInfo?: FileAttachment;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorUsername: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'file';
  fileInfo?: FileAttachment;
  survey?: Survey;
  likes: number;
  comments: CommunityComment[];
  timestamp: string;
  groupId?: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  creator: string;
  memberCount: number;
  icon: string;
  color: string;
  isMember?: boolean;
}

export interface DirectMessage {
  id: string;
  sender: string;
  receiver?: string;
  groupId?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'file';
  fileInfo?: FileAttachment;
  timestamp: string;
}

export interface FriendRelation {
  username: string;
  status: 'friend' | 'pending';
}
