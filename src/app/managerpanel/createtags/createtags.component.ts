import { Component, OnInit } from '@angular/core';
import { TagService } from './../../services/tag.service';
import { Tag } from './../../models/tag';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotobarComponent } from './../../photobar/photobar.component';
import { ErrorphotobarComponent } from './../../errorphotobar/errorphotobar.component';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';
import { ProfileService } from './../../services/profile.service';
import { TagToInsert } from './../../models/tagToInsert';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-createtags',
  templateUrl: './createtags.component.html',
  styleUrls: ['./createtags.component.css']
})
export class CreatetagsComponent implements OnInit {

  categories: Category[] = [];
  selectedOption: any = {};
  tagList: string[] = [];
  noteId: any;
  ipAddress: string = '';

  tag: TagToInsert = new TagToInsert();

  selectedFile: File | null = null ;
  durationInSeconds = 3;
  data = new FormData();
  photoUrl: string;
  note: Note;

  constructor(private tagService: TagService, private router: Router,
     private _snackBar: MatSnackBar, private noteService: NoteService, private httpClient: HttpClient, private categoryService: CategoryService) {

       this.note = new Note();
       //profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));

       this.photoUrl = 'https://img.freepik.com/free-icon/user_318-504048.jpg?w=360';
      }

      private changePhoto(_photoUrl: string): void {
        this.photoUrl = _photoUrl;
    }
  ngOnInit() {
        // tslint:disable-next-line:prefer-const


    this.categoryService.getCategories().subscribe((categoryList: Category[]) => {this.categories = categoryList; },
    error => {
      console.log('category service failed');
    });
  }

  onSubmit() {

    this.noteId = localStorage.getItem('editNoteId');
    this.tag.noteId = +this.noteId;
    this.tag.tags = this.tagList;
    //console.log("User id " + this.noteId)
    this.note.mainPhotourl = this.photoUrl;
    this.note.id = +this.noteId;
    this.note.categoryId = this.selectedOption;

    console.log("editnoteid " + this.noteId)

    this.tagService.insertTag(this.tag).subscribe(result => {
      this.noteService.updateNoteImage(this.note).subscribe(result => {
        this.router.navigate(['/usernotes']);
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log('basarısız bir tag ekleme');
    });


  }

  onFileSelected(event: any) {

    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    this.data.append('File', this.selectedFile);

    axios.post('http://api.articlesorigin.com/api/photo/insertphotonote', this.data, {
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
  }

  errorPhotoBar() {
    this._snackBar.openFromComponent(ErrorphotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

}
