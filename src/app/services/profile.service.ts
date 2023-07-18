import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT',
    'Authorization': 'Bearer ' + localStorage.getItem('user')
  }).set('content', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = environment.apiUrl + 'user/';
  user: User = new User();
  returnedUser: User = new User();
  decodedToken: any;
  jwtHelper = new JwtHelperService();
   @Output() getChangeInPhoto: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    //this.user = new User();
   }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'getuser/' + userId, httpOptions);
  }

  getProfile(userId: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'getuser/' + userId, httpOptions);
  }

  getSearchedUsers(wordandIdToSearch: HttpParams): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'getsearchedusers?' + wordandIdToSearch, httpOptions);
  }

  getUsers(wordToSearch: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'getusers/' + wordToSearch, httpOptions);
  }

  updateUser(user: User): Observable<User> {

    
    return this.http.put<User>(this.apiUrl + 'update', user, httpOptions).pipe(
      map((response: User) => {
        // tslint:disable-next-line:prefer-const

        //this.user = response;
        console.log('response id '  + response.id);

        console.log('response url '  + response.photoUrl);

        // let token = localStorage.getItem('token');
        // this.decodedToken = this.jwtHelper.decodeToken(token);
        // // this.fireIsLoggedIn.emit(user);

        //     // tslint:disable-next-line:prefer-const
         let userId = localStorage.getItem('editUserId');

         console.log('userIDDD' + userId);
        //let userId = localStorage.getItem('editUserId');
        this.getProfile(userId as string).subscribe((result: User) => {
        this.returnedUser = result;

        // emit kullanılabilir refresh yapmadan bağımsız componentlar için
        console.log("profil service photo url : " + this.returnedUser.photoUrl);
        this.getChangeInPhoto.emit(this.returnedUser.photoUrl);
         },
        error => {
         console.log('user data fetch failed.');
                 });
        // emit kullanılabilir refresh yapmadan bağımsız componentlar için
  
      //   let userId = localStorage.getItem('editUserId');
      //   this.getUser(+userId).subscribe((result: User) => {
      //   this.user = result;

      //   // emit kullanılabilir refresh yapmadan bağımsız componentlar için
      //   console.log("profil service photo url : " + this.user.photourl);
      //   
      // },
      // error => {
      //   console.log('user data fetch failed.');
      //           });
      return this.user;
      })
    );}




}
