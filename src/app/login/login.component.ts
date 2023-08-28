import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { NavComponent } from './../nav/nav.component';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Subject, catchError, map } from 'rxjs';
import { ExternalAuthDto } from '../models/ExternalAuthDto';

declare var google: any; // Google API'nin yüklenmesi

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
  googleIcon = faGoogle;
  googleUser: any;

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();


  constructor(public authService: AuthService, private http: HttpClient,
    private profileService: ProfileService,  private router: Router,
     private navbar: NavComponent, private googleAuthService: SocialAuthService) {
     
    }

    ngOnInit() {
      this.googleAuthService.authState.subscribe((user: SocialUser) => {
        if (user) {
          this.googleUser = user;
          const signInButton = document.getElementById("signinDiv");
          if (signInButton) {
            console.log('test11')
            signInButton.addEventListener("click", () => this.clickHandler(this.googleUser));
            google.accounts.id.renderButton(signInButton, {
              theme: 'outline',
              size: 'large',
              clickHandler: this.clickHandler(this.googleUser)
            });
          }
         
        }
      });
    }

    clickHandler = (user: SocialUser) => {
      this.externalLogin(user);
    };

  ngOnDestroy() {
    //document.body.classList.remove('imageback');
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

      if (error.status === 500 || error.status === 401) {
        this.error = 'Wrong username or password please try again!';
      }
    });

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line:prefer-const
    return !!token;
  }

  externalLogin = (user: SocialUser) => {
    this.authService.externalLogin(user).subscribe(next => {
   
      this.router.navigate(['/home']);
      this.googleAuthService.signOut();
    }, error => {

      if (error.status === 500 || error.status === 401) {
        this.error = 'Wrong username or password please try again!';
      }
    });

  }


  // private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //   this.authService.externalLogin(externalAuth)
  //     .subscribe({
  //       next: (res) => {
  //           localStorage.setItem("token", res.token);
  //           this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //           //this.router.navigate([this.returnUrl]);
  //     },
  //       error: (err: HttpErrorResponse) => {
  //         console.log('error message :  ' + err.message);
       
  //         //this.authService.signOutExternal();
  //       }
  //     });
  // }

}
