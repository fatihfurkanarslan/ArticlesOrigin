import { Component, OnInit, AfterViewInit, Input, ɵConsole, NgProbeToken, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/note';
import * as $ from 'jquery';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import { BehaviorSubject, throwError } from 'rxjs';
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
// import { Photo } from 'src/app/models/photo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../../snackbar/snackbar.component';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, catchError, tap, debounceTime, skip, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import { untilDestroyed } from '@ngneat/until-destroy';

import { debounce } from 'lodash';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})

export class CreatenoteComponent implements OnInit, OnDestroy {

  public noteToInsert = new Note();
  userId: any = {};
  noteId: any = {};
  imageList: string[] = [];
  durationInSeconds = 3;
  // tslint:disable-next-line:no-inferrable-types
  fired: boolean = false;

  tagList: string[] = [];

  editor: any;

  editorObserver: MutationObserver;
  editorData: any;
  parsedData: JSON;
  HtmlData: string = "";
  timer: any = 2;

  savingEditor: boolean = false;
  //autosaving


  constructor(private noteService: NoteService,
     private authService: AuthService,
      private _snackBar: MatSnackBar,
       private httpClient: HttpClient,
        private router: Router) {

        
    
       }

  //    editorConfig: AngularEditorConfig = {
  //     editable: true,
  //       spellcheck: true,
  //       height: 'auto',
  //       minHeight: '0',
  //       maxHeight: 'auto',
  //       width: 'auto',
  //       minWidth: '0',
  //       translate: 'yes',
  //       enableToolbar: true,
  //       showToolbar: true,
  //       placeholder: 'Enter text here...',
  //       defaultParagraphSeparator: '',
  //       defaultFontName: '',
  //       defaultFontSize: '',
  //       fonts: [
  //         {class: 'arial', name: 'Arial'},
  //         {class: 'times-new-roman', name: 'Times New Roman'},
  //         {class: 'calibri', name: 'Calibri'},
  //         {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  //       ],
  //       customClasses: [
  //       {
  //         name: 'quote',
  //         class: 'quote',
  //       },
  //       {
  //         name: 'redText',
  //         class: 'redText'
  //       },
  //       {
  //         name: 'titleText',
  //         class: 'titleText',
  //         tag: 'h1',
  //       },
  //     ],
  //      uploadUrl: 'https://localhost:44369/api/photo/insertphotonote'
  //     //  upload: (file: File) => { Observable<HttpEvent<UploadResponse>>
  //     //     const url = `https://localhost:44369/api/photo/insertphotonote`;
  //     //     const formData: FormData = new FormData();

  //     //     const noteId = localStorage.getItem('noteId');
  //     //     formData.append('File', file);
  //     //     formData.append('NoteId', noteId);
  //     //     formData.append('MainPhoto', 'false');

  //     //     return axios.post(url, formData, {headers: {
  //     //             'accept': 'application/json',
  //     //             'Content-Type': 'multipart/form-data'
  //     //     }}).then();

  //     //   const noteId = localStorage.getItem('noteId');
  //     //         const data = new FormData();
  //     //         data.append('File', file);
  //     //         data.append('NoteId', noteId);
  //     //         data.append('MainPhoto', 'false');

  //             // // axios.post<UploadResponse>('https://localhost:44369/api/photo/insertphotonote', formData, {
  //             // //   headers: {
  //             // //     'accept': 'application/json',
  //             // //     'Content-Type': 'multipart/form-data'
  //             // //   }
  //             // // }).then(res => {
  //             // //   // console.log(res.data);
  //             // //   //editor.image.insert(res.data, null, null, editor.image.get());
  //             // //    // this.imageList.push(res.data);
  //             // //    console.log('noteId of photo is ' + this.noteId);


  //             // // }).catch(err => {
  //             // //   console.log(err);
  //             // // });


  // };


  // options: Object = {
  //   charCounterCount: false,
  //   placeholderText: 'Edit Your Content Here!',
  //   imageUpload: true,
  //   imageDefaultAlign: 'left',
  //   imageDefaultDisplay: 'inline-block',
  //   pastePlain: true,
  //   heightMin: 150,
  //   // Set max image size to 3MB.
  //   imageMaxSize: 3 * 1024 * 1024,
  //   // Allow to upload PNG and JPG.
  //   imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  //    toolbarButtons: [ 'bold', 'italic', 'underline', 'subscript', 'superscript', 'fontFamily', 'align', 'orderedList',
  //    'unorderedList', 'quote', 'fontSize', 'insertLink', 'insertImage', 'specialCharacters', 'html', 'undo', 'redo'],
  //   events: {
  //     'froalaEditor.image.beforeUpload': function(e, editor, images) {
  //       // Before image is uploaded
  //       const noteId = localStorage.getItem('noteId');
  //       const data = new FormData();
  //       data.append('File', images[0]);
  //       data.append('NoteId', noteId);
  //       data.append('MainPhoto', 'false');

  //       axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
  //         headers: {
  //           'accept': 'application/json',
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }).then(res => {
  //         // console.log(res.data);
  //          editor.image.insert(res.data, null, null, editor.image.get());
  //          // this.imageList.push(res.data);
  //          console.log('noteId of photo is ' + this.noteId);
  //       }).catch(err => {
  //         console.log(err);
  //       });
  //       return false;
  //     }
  //   }
  // };


  ngOnInit() {

    this.userId = this.authService.decodedToken.nameid;

    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.noteToInsert.IPAddress = ""+res.ip;
      console.log("idadress : " + this.noteToInsert.IPAddress);
    });

    this.editor = new EditorJS({

      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        image: {
          class: ImageTool,
          config: {
            // endpoints: {
            //   byFile: 'https://localhost:44369/api/photo/insertphotonote' // Your backend file uploader endpoint
            // },
            uploader: {

                /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
              uploadByFile(file:any){
              //this.noteId = localStorage.getItem('noteId');
              const data = new FormData();
              data.append('File', file);
              data.append('NoteId', localStorage.getItem('noteId'));
              data.append('MainPhoto', 'false');

              console.log('file -->' + file);
              return axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
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

              })
              },

                 /**
              * @param {string} url - pasted image URL
              * @return {Promise.<{success, file: {url}}>}
              */
                 uploadByUrl(url: any): Promise<{ success: number; file: { url: any } }>{
               // your ajax request for uploading
               //this.noteId = localStorage.getItem('noteId');
               const data = new FormData();
               data.append('File', url);
               data.append('NoteId', localStorage.getItem('noteId'));
               data.append('MainPhoto', 'false');

               console.log('url -->' + url);
               return axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
                 headers: {
                   'accept': 'application/json',
                   'Content-Type': 'multipart/form-data'
                 }
               }).then((res:any) => {

                return Promise.resolve({ success: 1, file: { url: url } });

               })
            }
          }
        }
      },
      raw: {
        class: RawTool,
        inlineToolbar: true
      },
      linkTool: {
        class: LinkTool
      }
    },
  
    onChange: () => {
      console.log("onchange e girdi")
      this.saveEditorData();
      this.extendedDebounceHandler();
    }
    });
  }

  extendedDebounceHandler = debounce(() => {
  
    if(localStorage.getItem('noteId') == null){
      console.log("if bloğunda.." + localStorage.getItem('noteId'));
      this.noteToInsert.userId = this.userId;
      this.noteToInsert.isDraft = true;
      this.noteToInsert.categoryId = 1;
      //console.log("localstore getitem worked.." + localStorage.getItem('noteId'));
      this.noteService.draftNote(this.noteToInsert).subscribe(id => {
        this.noteId = id;
        localStorage.setItem('noteId', this.noteId);
       },
         error => {
           console.log('note id service failed');
         });
        }else{
        console.log('else bloğunda');
        this.SaveDraft();
    
        }
  }, 3000);

  SaveDraft() {
    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('noteId');

  //  this.saveEditorData();

    const images = $('img').map(function() {
      return $(this).attr('src').toString();
   });

   for (let i = 0; i < images.length; i++) {
     this.imageList.push(images[i].toString());
   }

  
  // $('img').map();
  // this.imageList.push($('img').prop('src'));
  // for (let i = 0; i < imgArray.length; i++) {
  //   this.noteToInsert.photos[i] = imgArray[i];
  //     }
  // console.log('photooo ' + this.noteToInsert.photos[0]);
  // this.noteToInsert.photos.push();
  // this.noteToInsert.categoryId = this.selectedOption;
  this.noteToInsert.userId = this.userId;
  this.noteToInsert.photos = this.imageList;
  this.noteToInsert.isDraft = true;
  this.noteToInsert.id = +noteId;
  this.noteToInsert.text = this.HtmlData;
  this.noteToInsert.rawText = this.editorData;

  //console.log("this.noteToInsert.rawText : " + this.editorData);

   // this.noteToInsert.tags = this.tags;

  // console.log('tags : ' + this.tags);

  this.noteService.updateNote(this.noteToInsert).subscribe(data => {
    //this.router.navigate(['/usernotes']);
    //console.log('successed to update note');
    this.openSnackBarDraft();
  }, error => {
    console.log('failed to update note');
  });
  }

  saveEditorData = debounce(() => { 
    this.editor.save().then((outputData:any) => {
      this.editorData =  JSON.stringify(outputData, null, 2);
      console.log("*editordata : " + this.editorData);
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
    })}, 1000)

  ngOnDestroy(): void {
    localStorage.removeItem('noteId');
    //localStorage.removeItem('editNoteId');
  }


  // detectEditorChanges(): Observable <any> {

  //   return new Observable(observer => {

  //     const editorDom = document.querySelector('#editor-js');
  //     const config = { attributes: true, childList: true, subtree: true };

  //     this.editorObserver = new MutationObserver((mutation) => {
  //       observer.next(mutation);
  //     })
  //     this.editorObserver.observe(editorDom, config);

  //   })
  // }


  onSubmit() {

    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('noteId');
  


      const images = $('img').map(function() {
        return $(this).attr('src').toString();
     });

     for (let i = 0; i < images.length; i++) {
       this.imageList.push(images[i].toString());
     }

     //this.saveEditorData();

   // console.log(this.tagList + ' fskdfs');

    // $('img').map();
    // this.imageList.push($('img').prop('src'));
    // for (let i = 0; i < imgArray.length; i++) {
    //   this.noteToInsert.photos[i] = imgArray[i];
    //     }
    // console.log('photooo ' + this.noteToInsert.photos[0]);
    // this.noteToInsert.photos.push();
    //this.noteToInsert.categoryId = this.selectedOption;
    this.noteToInsert.userId = this.userId;
     this.noteToInsert.photos = this.imageList;
     this.noteToInsert.isDraft = false;
     this.noteToInsert.tags = this.tagList;
     this.noteToInsert.text = this.HtmlData;
     this.noteToInsert.rawText = this.editorData;

     this.noteToInsert.id = +noteId;

     console.log("this.noteToInsert.text = " + this.HtmlData);

    //  console.log("*editordata : " + this.editorData);

    //  console.log("*parseddata : " + this.parsedData);
   // console.log('tags : ' + this.tags);

    this.noteService.updateNote(this.noteToInsert).subscribe(data => {
      console.log('success to update note');
      localStorage.setItem('editNoteId', this.noteId);

    }, error => {
      console.log('failed to update note');
    });

    this.router.navigate(['/createtags']);

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

  getIPAddress()
  {
    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.noteToInsert.IPAddress = res.ip;
      console.log("idadress : " + this.noteToInsert.IPAddress);
    });
  }

}
