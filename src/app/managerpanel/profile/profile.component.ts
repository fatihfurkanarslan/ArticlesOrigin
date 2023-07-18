import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: number;

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) {
    this.user = new User();
   }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.profileService.getUser(this.userId).subscribe((result: User) => {this.user = result; });
  }

  editProfile() {
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', this.user.id.toString());
    this.router.navigate(['/editprofile']);
  }

}
