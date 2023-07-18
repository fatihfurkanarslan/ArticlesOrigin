import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { Tagmodel } from '../models/tagmodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

const httpOptionsGetNote = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  tag: Tagmodel = new Tagmodel();

  apiUrl = environment.apiUrl + 'note/';

  constructor(private http: HttpClient) { }

  getPopularNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getpopularnotes');
  }

  getNotesWithScroll(pageNumber: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getnotes?pageNumber=' + pageNumber);
  }

  // get by note id
  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + 'getnote/' + id, httpOptions);
  }

  // get by category id
  getNotes(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getnotesbycategory/' + id, httpOptions);
  }

  insertNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + 'insert', note, httpOptions);
  }

  deleteNote(noteId: number): Observable<Note> {
    return this.http.delete<Note>(this.apiUrl + 'delete/' + noteId, httpOptions);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.apiUrl + 'update', note, httpOptions);
  }

  updateNoteImage(note: Note): Observable<Note> {
    return this.http.put<Note>(this.apiUrl + 'updateImage', note, httpOptions);
  }

  draftNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + 'draft', note, httpOptions);
  }

  // drafts get by user id
  getDraftNotes(id: number) {
    return this.http.get<Note[]>(this.apiUrl + 'getnotesbyuser/' + id, httpOptions);
  }

  getNotesByTag(tag: string): Observable<Note> {
    console.log("getNotesByTag worked : " + tag);

    //error in tagparam Cannot set properties of undefined (setting 'tagParam')
    this.tag.tagParam = tag;
    return this.http.post<Note>(this.apiUrl + 'getnotesbytag', this.tag, httpOptions);

  }
}
