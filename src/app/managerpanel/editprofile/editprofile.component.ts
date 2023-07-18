import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotobarComponent } from 'src/app/photobar/photobar.component';
import { PhotoService } from './../../services/photo.service';
import axios from 'axios';
import { ErrorphotobarComponent } from 'src/app/errorphotobar/errorphotobar.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user: User;
  userId: number;

  selectedFile: File = null;
  durationInSeconds = 3;
  data = new FormData();
  photoUrl: string;

  constructor(private profileService: ProfileService, private _snackBar: MatSnackBar,
     private authService: AuthService, private photoService: PhotoService) {
      this.user = new User();
      
      this.profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
      }

      private changePhoto(_photoUrl: string): void {
        this.photoUrl = _photoUrl;
        
      }

  ngOnInit() {

    
    // tslint:disable-next-line:prefer-const
    // let userId = localStorage.getItem('editUserId');
    this.userId = this.authService.decodedToken.nameid;
    this.profileService.getUser(this.userId).subscribe((result: User) => {this.user = result; });

  }

  onFileSelected(event: any) {

    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    this.data.append('File', this.selectedFile);

    axios.post('https://localhost:44369/api/photo/insertphotonote', this.data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
       this.photoUrl = res.data;
       this.user.photoUrl = this.photoUrl;
      
       console.log("PhotoUrl : " + this.photoUrl);
       this.openSnackBar();

    }).catch(err => {
      this.errorPhotoBar();
    });

    // this.photoService.insertPhoto(this.data).subscribe(result => {
    //   this.photoUrl = result;
    //   console.log('ffjslk   ' + this.photoUrl);
    // }, error => {
    //   console.log('photo yukleme basarısız');
    // });

  }

  updateProfile() {

    console.log('in editprofile in updateprofil method' + this.user.photoUrl);
    
    this.profileService.updateUser(this.user).subscribe(result => {
     
    
      console.log('basarılı edit user'); },
    error => {
      console.log('failed at edit user');
    }
    );

  }

  openSnackBar() {
    this._snackBar.openFromComponent(PhotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });

    this.user.photoUrl = this.photoUrl;
  }

  errorPhotoBar() {
    this._snackBar.openFromComponent(ErrorphotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

}
