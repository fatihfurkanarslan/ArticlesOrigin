import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Followmodel } from '../models/followmodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  apiUrl = environment.apiUrl + 'follower/';

constructor(private http: HttpClient) { }

followWriter(model : Followmodel) : Observable<number> {
  return this.http.post<number>(this.apiUrl + 'follow', model, httpOptions);
}

unfollowWriter(model : Followmodel) : Observable<number> {
  return this.http.post<number>(this.apiUrl + 'unfollow', model, httpOptions);
}

getFollowInfo(model : Followmodel) : Observable<boolean>{
  return this.http.post<boolean>(this.apiUrl + 'follow', model, httpOptions);
}

}
