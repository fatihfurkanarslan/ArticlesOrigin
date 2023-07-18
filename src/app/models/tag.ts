import { Note } from './note';

export class Tag {
  id: number;
  // noteId: number;
  onCreated: number;
  onModifiedUsername: string;
  tags: string;
 // tag: string;
  notes: Note[];
}
