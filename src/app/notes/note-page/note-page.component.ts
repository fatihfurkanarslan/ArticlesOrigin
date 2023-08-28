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
import { Observable, map } from 'rxjs';
import { faTwitter, faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Followmodel } from 'src/app/models/followmodel';
import { FollowService } from 'src/app/services/follow.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ShareModalComponent } from 'src/app/Utils/share-modal/share-modal.component';
import { ClipboardService } from 'ngx-clipboard';



@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotePageComponent implements OnInit {

  twitterIcon = faTwitter;
  instagramIcon = faInstagram;
  facebookIcon = faFacebook;
  whatsappIcon = faWhatsapp;
  linkIcon = faLink;
  currentUrl: string;

  commentModel: any = {};
  likeModel: any = {};
  id: number;
  userId!: number;

  form: FormGroup = new FormGroup({
    Text: new FormControl(''),
  });
  private sub: any;
  note: Note = null;

  commentsArray$: Observable<Comment[]>; // Change the variable name and add the "$" suffix
  likes!: Like[];
  likeCount = 0;

  commentToInsert!: Comment;

  tagsToPrint: string[];

  htmlCode!: SafeHtml;
  toBeParsedData: any;
  token: any;

  jwtHelper = new JwtHelperService();

  followerModel!: Followmodel;
  decodedToken: any;
  followerId: string = '';
  followeeId: string = '';
 
  followBtnText: string = "follow";
  followInfo: any;

  isCopied: boolean = false;

  constructor(private route: ActivatedRoute, private noteService: NoteService,
     private commentService: CommentService, public authService: AuthService,
   private router: Router, private dialog: MatDialog, private likeService: LikeService,
    private domSanitizer: DomSanitizer,  private httpClient: HttpClient, private followService : FollowService
    ,private profilService: ProfileService, private clipboardApi: ClipboardService) {
      this.token = null;
    }

  ngOnInit() {
      this.token = localStorage.getItem('token');

      this.currentUrl = window.location.href;
      this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      });

      
this.noteService.getNote(this.id).subscribe((data: Note) => {
  this.note = data;
  this.toBeParsedData = JSON.parse(this.note.rawText);
  // this.profilService.getProfile(this.note.userId).subscribe((user: User) => 
  // this.followInfo = user.followInfo
  // ) ;
  // console.log( "follow info : " + this.followInfo);

 },
  error => console.log('failed note get method'));


    this.commentsArray$ = this.commentService.getComments(this.id).pipe(map((comments: Comment[]) =>     
          comments.filter(comment => comment.deleted === false))
    );

     
  }



  onSubmit() {

   
    this.commentService.updateComment(this.commentToInsert).subscribe(result => { 
      this.commentsArray$ = this.commentService.getComments(this.id).pipe(
        map((comments: Comment[]) => 
          //console.log(comments.filter(comment => comment.deleted === false));
          comments.filter(comment => comment.deleted === false))
      );
    },
    error => console.log('failed') );
  }



  makeComment() {
    this.userId = this.authService.decodedToken.nameid;

    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      //db'de ipaddress columnu oluşturmak gerekli
      //this.commentModel.IPAddress = ""+res.ip;
      console.log("idadress : " + this.commentModel.IPAddress);

      this.commentModel.userId = this.userId;
      this.commentModel.noteId = this.note.id;
  
      this.commentService.insertComment(this.commentModel).subscribe(result => {
        console.log('success to insert comment :' + result);
        // this.noteService.getNote(+this.id).subscribe((data: Note) => {
        //   this.note = data; 
        // }, 
        // error => console.log('failed note get method'));
        this.commentsArray$ = this.commentService.getComments(this.id).pipe(
          map((comments: Comment[]) => {return comments.filter(comment => comment.deleted === false)})
        );
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
    //   this.commentService.getComments(+this.id).subscribe((commentList: Comment[]) => {
    //     console.log("in comment service in deletecomment func");
    //     this.commentsArray = commentList; },
    // error => {
    //   console.log('comment service failed');
    // });
     this.commentsArray$ = this.commentService.getComments(this.id).pipe(
      map((comments: Comment[]) => {return comments.filter(comment => comment.deleted === false)})
    );
    })
  }

  // openShareModal(platform: string) {
  //   console.log('platform nedir : ' + platform)
  //   if (platform === 'whatsapp') {
  //     //const currentUrl = window.location.href; // Mevcut sayfanın URL'sini al
  //     const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(this.currentUrl)}`;
  //     console.log('whatsappurlll : ' + whatsappUrl)
  //     window.open(whatsappUrl, '_blank'); // Yeni pencerede WhatsApp aç
  //   } else {
  //     const dialogRef = this.dialog.open(ShareModalComponent, {
  //       data: { platform, noteId: this.note.id }
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       // Handle modal close event if needed
  //     });
  //   }
  // }

  shareOnTwitter(){
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(this.currentUrl)}`;

    window.open(twitterUrl, '_blank'); 
  }

  shareOnFacebook(){
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.currentUrl)}`;
    window.open(facebookUrl, '_blank'); 
  }

  shareOnWhatsapp(){
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(this.currentUrl)}`;
     
      window.open(whatsappUrl, '_blank'); 
  }
  
  copyUrlToClipboard() {
    this.clipboardApi.copy(this.currentUrl); // URL'yi panoya kopyala
    this.isCopied = true; // Copied yazısını göster

    // Belirli bir süre sonra "Copied" yazısını gizle
    setTimeout(() => {
      this.isCopied = false;
    }, 2000); // Örneğin, 2 saniye sonra gizle
  }


  // FollowWriter(element: any, item: any){
  //   //getting user info
  //   let token = localStorage.getItem('token');
  //   this.decodedToken = this.jwtHelper.decodeToken(token as string);
  //   this.followerId = this.decodedToken.nameid;

  //   this.followerModel = {
  //   followerId: this.followerId,
  //   // getting id about followee
  //   followeeId: item
  //   };

  //   console.log("followerID " + this.followerId + "followeeID " + item);

  //     if(element.innerText == 'follow'){
  //       console.log("innerhtml is ok");
  //           this.followService.followWriter(this.followerModel).subscribe((result : any) => {
  //             console.log("followservice is ok for unfollow");
  //       if (result === 1) {
  //         console.log("followservice is worked with 1");
  //         element.innerText = "unfollow";
  //       // this.isFollow  = !this.isFollow;
  //     }
  //   },
  //     error => console.log("followriter func not worked.."));
  //     }
  //     if(element.innerText == 'unfollow') {
  //       console.log("innerhtml is ok for unfollow");
  //       this.followService.unfollowWriter(this.followerModel).subscribe((result : any) => {
  //       if (result === 1) {
  //       element.innerText = "follow";
  //       // this.isFollow  = !this.isFollow;
  //       }
  //     },
  //       error => console.log("unfollowriter func not worked.."));
  //     }





  // }


}
