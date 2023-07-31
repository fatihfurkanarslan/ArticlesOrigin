import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { environment } from 'src/environments/environment';
import { PhotobarComponent } from 'src/app/photobar/photobar.component';
import { ErrorphotobarComponent } from './../../errorphotobar/errorphotobar.component';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  category:any;
  // editForm: FormGroup;

  // categoryToCreate: any = {};
  selectedFile: File = null;
  photoUrl: string;
  durationInSeconds = 3;
  data = new FormData();
  imageUrl: string;

  baseUrl = environment.apiUrl;

  constructor(private categoryService: CategoryService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.category = new Category();

    // tslint:disable-next-line:prefer-const
    let categoryId = localStorage.getItem('editCategoryId');
    // this.editForm = this.formBuilder.group({
    //   id: [],
    //   name: ['', Validators.required],
    //   description: ['', Validators.required],
    //   photoUrl: []
    // });

    this.categoryService.getCategory(+categoryId).subscribe(result => {
      this.category = result;
      this.imageUrl = this.category.photoUrl;
    });

  }

  onFileSelected(event:any) {

    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    this.data.append('File', this.selectedFile);

    axios.post(this.baseUrl + 'photo/insertphotonote', this.data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
       this.photoUrl = res.data;
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
   const formData: FormData = new FormData();

   formData.append('File', this.selectedFile);
   formData.append('Categoryname', this.category.categoryname);
   formData.append('Description', this.category.description);
   formData.append('Photourl', this.imageUrl);
   formData.append('Id', this.category.id.toString());


   this.categoryService.updateCategory(formData).subscribe(data => {
     console.log('success to insert category');
     this.router.navigate(['/allcategories']);
   }, error => {
     console.log('failed to insert category');
   });
 }

}
