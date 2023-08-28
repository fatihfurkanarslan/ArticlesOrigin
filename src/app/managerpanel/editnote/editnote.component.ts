import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Category } from './../../models/category';
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
import { Note } from 'src/app/models/note';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import { Observable } from 'rxjs';
import { map, catchError, tap, debounceTime, skip } from 'rxjs/operators';
import { debounce } from 'lodash';
import { HttpClient } from '@angular/common/http';

enum saveStatus {
  saving = 1,
  saved = 2,
  idle = 3
}

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})
export class EditnoteComponent implements OnInit {

  @ViewChild('editorElement', { static: false }) editorElement: ElementRef;


  categories: Category[] = [];
  selectedOption: any = {};
  userId: any = {};
  noteId: any;
  imageList: string[] = [];
  durationInSeconds = 3;
  editor: any;
  editorObserver: MutationObserver;
  editorData: any;
  parsedData: JSON;
  HtmlData: string = "";
  note: Note;

  constructor(
    private noteService: NoteService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.note = new Note();
  }

  ngOnInit() {
    this.userId = this.authService.decodedToken.nameid;
    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res: any) => {
      this.note.IPAddress = "" + res.ip;
    });

    this.editor = new EditorJS({
      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        raw: {
          class: RawTool,
          inlineToolbar: true
        },
        linkTool: {
          class: LinkTool
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: (file: any) => {
                const data = new FormData();
                data.append('File', file);
                data.append('NoteId', localStorage.getItem('noteId') || '');
                data.append('MainPhoto', 'false');

                //console.log('file -->' + file);
                return axios.post('http://apis.articlesorigin.com/api/photo/insertphotonote', data, {
                  headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(res => {
                  return {
                    success: 1,
                    file: {
                      url: res.data,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    }
                  };
                });
              },
              uploadByUrl: (url: any) => {
                const data = new FormData();
                data.append('File', url);
                data.append('NoteId', localStorage.getItem('noteId') || '');
                data.append('MainPhoto', 'false');

               // console.log('url -->' + url);
                return this.httpClient.post('http://apis.articlesorigin.com/api/photo/insertphotonote', data, {
                  headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                  }
                }).toPromise().then((res: any) => {
                  return {
                    success: 1,
                    file: {
                      url: res.data,
                      // any other image data you want to store, such as width, height, color, extension, etc
                    }
                  };
                });
              }
            }
          }
        }
      },
      onReady: () => {
        let noteId = localStorage.getItem('editNoteId');


        this.noteService.getNote(+noteId).subscribe(result => {
          this.note = result;
          this.editorData = this.note.rawText;
          console.log("this.editorData : " + this.note)
          let parsedData = JSON.parse(this.editorData);
          console.log("this.parseddata : " + parsedData)
          this.editor.render(parsedData);
        });
      },
      onChange: () => {
        console.log("onchange e girdi")
        this.saveEditorData();
        this.extendedDebounceHandler();
      }
    });
  }

  extendedDebounceHandler = debounce(() => {
    console.log('saving in editnote');
    this.SaveDraft();
  }, 3000);

  saveEditorData(): void {
    this.editor.save().then((outputData: any) => {
      this.editorData = JSON.stringify(outputData, null, 2);
      //console.log("*editordata : " + this.editorData);
      let parsedData = JSON.parse(this.editorData);

      for (let i = 0; i < parsedData.blocks.length; i++) {
        let block = parsedData.blocks[i];
        if (block.type === 'header') {
          this.HtmlData += '<header><h1>' + block.data.text + '</h1></header>';
        }
        if (block.type === 'paragraph') {
          this.HtmlData += '<p>' + block.data.text + '</p>';
        }
        if (block.type === 'image') {
          this.HtmlData += '<img src="' + block.data.file.url + '">';
        }
        if (block.type === 'raw') {
          this.HtmlData += block.data.html;
        }
        if (block.type === 'linkTool') {
          this.HtmlData += '<a href="' + block.data.link + '">' + block.data.link + '</a>';
        }
      }
    });
  }

  onSubmit() {
    let noteId = localStorage.getItem('editNoteId');

    const images = this.editorElement.nativeElement.querySelectorAll('img');
    //const imageList = [];

    images.forEach((img: HTMLImageElement) => {
      this.imageList.push(img.src);
    });

    this.note.userId = this.userId;
    this.note.photos = this.imageList;
    //this.note.isDraft = false;
    this.note.text = this.HtmlData;
    this.note.rawText = this.editorData;
    this.note.id = +noteId;

    this.noteService.updateNote(this.note).subscribe(data => {
      console.log('success to update note');
    }, error => {
      console.log('failed to update note');
    });

    this.router.navigate(['/createtags']);
  }

  SaveDraft() {
    let noteId = localStorage.getItem('editNoteId');

    // const images = $('img').map(function () {
    //   return $(this).attr('src').toString();
    // });
    // const images = Array
    // .from(this.editorElement.nativeElement.querySelectorAll('img'))
    // .map((img: HTMLImageElement) => img.src);
    const images = this.editorElement.nativeElement.querySelectorAll('img');
    //const imageList = [];

    images.forEach((img: HTMLImageElement) => {
      this.imageList.push(img.src);
    });



    // for (let i = 0; i < images.length; i++) {
    //   this.imageList.push(images[i].toString());
    // }

    this.note.userId = this.userId;
    this.note.photos = this.imageList;
    //this.note.isDraft = true;
    this.note.id = +noteId;
    this.note.text = this.HtmlData;
    this.note.rawText = this.editorData;

    this.noteService.updateNote(this.note).subscribe(data => {
      this.openSnackBarDraft();
    }, error => {
      console.log('failed to update note');
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

  openSnackBarDraft() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

}