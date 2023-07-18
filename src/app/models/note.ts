import { Photo } from './photo';
import { Comment } from './comment';
import { Like } from './like';

export class Note {

  id: number;
  title: string;
  description: string;
  text: string;
  rawText: string;
  likeCount: number;
  onModifiedUsername: string;
  onModified: string;
  categoryId: number;
  userId: string;
  isDraft: boolean;
  mainPhotourl: string;
  IPAddress:string;
  photos: string[];
  comments: Comment[];
  tags: string[];
  likes: Like[];
}
