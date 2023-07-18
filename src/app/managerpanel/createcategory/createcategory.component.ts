import { Component, OnInit } from '@angular/core';
import { Category } from './../../models/category';
import { environment } from 'src/environments/environment';
import { CategoryService } from './../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { PhotobarComponent } from 'src/app/photobar/photobar.component';
import { ErrorphotobarComponent } from 'src/app/errorphotobar/errorphotobar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {

  category:any;
  selectedFile: File = null;
  photoUrl: string;
  data = new FormData();
  durationInSeconds = 3;
  imageUrl: string;
  errorMessage: string;

  baseUrl = environment.apiUrl;

  constructor(private categoryService: CategoryService, private _snackBar: MatSnackBar,
     private router: Router) { }

  ngOnInit() {
    this.category = new Category();
    this.imageUrl = 'https://www.elegantthemes.com/blog/wp-content/uploads/2017/08/featuredimage.jpg';
  }


  onFileSelected(event:any) {

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
       console.log('---' + res.data);
       console.log('---' + res);
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

  openSnackBar() {
    this._snackBar.openFromComponent(PhotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
    this.imageUrl = this.photoUrl;
  }

  errorPhotoBar() {
    this._snackBar.openFromComponent(ErrorphotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }


  onSubmit() {

    this.imageUrl = this.photoUrl;

    const formData: FormData = new FormData();

    formData.append('Categoryname', this.category.categoryname);
    formData.append('Description', this.category.description);
    formData.append('Photourl', this.imageUrl);

    this.categoryService.insertCategory(formData).subscribe(data => {
      if (data === 0) {
        this.errorMessage = 'Category is already haven.';
      }else{
        this.router.navigate(['/allcategories']);
      }

    }, error => {
      console.log('failed to insert category');
    });
  }

}
