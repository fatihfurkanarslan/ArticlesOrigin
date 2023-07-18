import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from './../../services/note.service';
import { Note } from 'src/app/models/note';
import { CommentService } from './../../services/comment.service';
import { Comment } from './../../models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from './../../models/tag';
import { LikeService } from 'src/app/services/like.service';
import { Like } from './../../models/like';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ArrayFixPipe } from 'src/app/array-fix.pipe';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotePageComponent implements OnInit {



  commentModel: any = {};
  likeModel: any = {};
  id!: number;
  userId!: number;

  form: FormGroup = new FormGroup({
    Text: new FormControl(''),
  });
  private sub: any;
  note!: Note;

  commentsArray!: Comment[];
  likes!: Like[];
  likeCount = 0;

  commentToInsert!: Comment;

  tags!: Tag[];

  htmlCode!: SafeHtml;
  toBeParsedData: any;
  token: any;

  constructor(private route: ActivatedRoute, private noteService: NoteService,
     private commentService: CommentService, public authService: AuthService,
   private router: Router, private tagService: TagService, private likeService: LikeService, private domSanitizer: DomSanitizer,  private httpClient: HttpClient) {
      this.token = null;
    }

  ngOnInit() {

      this.token = localStorage.getItem('token');

      this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      });

this.noteService.getNote(this.id).subscribe((data: Note) => {
  this.note = data;
  this.toBeParsedData = JSON.parse(this.note.rawText);
  //this.htmlCode = this.domSanitizer.bypassSecurityTrustHtml(this.note.text);
 },
  error => console.log('failed note get method'));

// this.tagService.getTags(this.id).subscribe(result => {this.tags = result; },
//   error => {
// console.log('tag service failed ');
//   });


    this.commentService.getComments(+this.id).subscribe((commentList: Comment[]) => {
      console.log("in comment service");
      this.commentsArray = commentList;
     },
    error => {
      console.log('comment service failed');
    });
  }

  onSubmit() {
    this.commentService.updateComment(this.commentToInsert).subscribe(result => { console.log('successed'); },
    error => console.log('failed') );
  }



  makeComment() {
    this.userId = this.authService.decodedToken.nameid;

    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.commentModel.IPAddress = ""+res.ip;
      console.log("idadress : " + this.commentModel.IPAddress);

      this.commentModel.userId = this.userId;
      this.commentModel.noteId = this.note.id;
  
      this.commentService.insertComment(this.commentModel).subscribe(result => {
        console.log('success to insert comment :' + result);
        this.noteService.getNote(+this.id).subscribe((data: Note) => {
          this.note = data; 
        }, 
        error => console.log('failed note get method'));
        this.commentModel.text = '';
      }, error => {
        console.log('failed to insert comment :' + error);
      });
    });

  }

  searchNotes(btnValue: any) {
    this.router.navigateByUrl('/searchednotes', {state: {redirect: btnValue}});
  }

  increaseLike() {
    if (this.likeCount < 10){
      this.likeModel.userId = this.userId;
      this.likeModel.noteId = this.note.id;

      this.likeService.insertLike(this.likeModel).subscribe(result => {});
      this.note.likes.push(new Like());
      this.likeCount++;
    }else {
      console.log('limit of like button');
    }

  }

  deleteComment(commentId: number){
    this.commentService.deleteComment(commentId).subscribe(result => {
      console.log('comment id ' + commentId);
      this.commentService.getComments(+this.id).subscribe((commentList: Comment[]) => {
        console.log("in comment service in deletecomment func");
        this.commentsArray = commentList; },
    error => {
      console.log('comment service failed');
    });
    })
  }


}
