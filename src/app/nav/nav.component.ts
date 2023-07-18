import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from './../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  user!: User;
  searchToTag!: string;
  // isUserLoggedIn: boolean;
  currentUser$!: Observable<string>;
  photoUrl!: string;
  isactive!: boolean;

 // tslint:disable-next-line:no-inferrable-types
 // public isViewable: boolean = true;
  // decodedToken: any = {};

  constructor(public authService: AuthService, private http: HttpClient,
    private profileService: ProfileService,  private router: Router) {
      // this.isViewable = true;
      //// this.user = new User();

      this.authService.getLoggedInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
      this.authService.getLoggedInActive.subscribe(isactive => this.checkActivate(isactive));
      this.profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));

    }

    private changePhoto(_photoUrl: string): void {
      this.photoUrl = _photoUrl;
  }

  private checkActivate(_isactive: boolean): void {
    this.isactive = _isactive;
    console.log('active or not ---> ' + this.isactive);

}

  ngOnInit() {
    this.currentUser$ = this.authService.currentUser$;


    this.authService.loginCheck();

  }


  loggedIn() {
    const token = localStorage.getItem('token');
    console.log('loggedIn!!!');
    // tslint:disable-next-line:prefer-const
    return !!token;
  }


  loggedOut() {
    this.authService.logOut();
    // this.isUserLoggedIn = false;
    // this.alertify.success('log out is successfull');
    console.log('logged out !!');
    this.router.navigate(['/home']);

  }

  // getCurrentUser(){
  //   this.authService.currentUser$.subscribe(user => {
  //   this.isUserLoggedIn = !!user;
  //   }, error => {
  //   console.log(error);
  //   });
  // }

  searchNote() {
    this.router.navigateByUrl('/searchednotes', {state: {redirect: this.searchToTag}});
    console.log('search button worked  ' + this.searchToTag);
    this.searchToTag = '';
    close();
  }


}
