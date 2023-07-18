import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Like } from '../models/like';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('Content-type', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  apiUrl = environment.apiUrl + 'like/';

constructor(private http: HttpClient) { }

getLikes(): Observable<Like[]> {
  return this.http.get<Like[]>(this.apiUrl + 'getlikes', httpOptions);
}

getLike(noteId: number): Observable<Like> {
  return this.http.get<Like>(this.apiUrl + 'getlikes/' + noteId, httpOptions);
}

insertLike(like: Like): Observable<Like> {
  return this.http.post<Like>(this.apiUrl + 'insert', like, httpOptions);
}

deleteLike(categoryId: number): Observable<Like> {
  return this.http.delete<Like>(this.apiUrl + 'delete/' + categoryId, httpOptions);
}


}
