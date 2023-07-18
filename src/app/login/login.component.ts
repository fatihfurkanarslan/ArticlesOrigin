import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { NavComponent } from './../nav/nav.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  model: any = {};
  user: User;
  error = '';
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();


  constructor(public authService: AuthService, private http: HttpClient,
    private profileService: ProfileService,  private router: Router, private navbar: NavComponent) {
    }

  ngOnInit() {
    document.body.classList.add('imageback');
  }

  ngOnDestroy() {
    document.body.classList.remove('imageback');
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      // this.decodedToken = this._jwtHelperService.decodeToken(user.tokenString);
      // tslint:disable-next-line:prefer-const
      // let userId = this.authService.decodedToken.nameid;
      // this.profileService.getUser(userId).subscribe((result: User) => {
      //   this.user = result;
      //   console.log('resim ' + this.user.photoUrl);
      //   // this.navbar.ngOnInit();
      // });
      this.router.navigate(['/home']);
//       this.router.navigateByUrl('/nav', {skipLocationChange: true}).then(() =>
// this.router.navigate(['/home']));
     //  this.router.navigateByUrl('/', {state: {redirect: btnValue}});
    }, error => {

      if (error.status === 500) {
        this.error = 'Wrong username or password please try again!';
      }
    });

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line:prefer-const
    return !!token;
  }

}
