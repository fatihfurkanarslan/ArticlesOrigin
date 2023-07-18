import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { Tagmodel } from 'src/app/models/tagmodel';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProfileService } from './../../services/profile.service';
import { User } from './../../models/user';
import { FollowService } from './../../services/follow.service';
import { Followmodel } from './../../models/followmodel';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-searchednotes',
  templateUrl: './searchednotes.component.html',
  styleUrls: ['./searchednotes.component.css']
})
export class SearchednotesComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  searchKeyword: string;

  searchedTag: Note[] = [] ;
  searchedPeople: User[] = [];

  selectedTabIndex : number = 0;

  data: any = {};
  routeState: any;

 followerModel!: Followmodel;
 decodedToken: any;
 followerId: string = '';
 followeeId: string = '';

 followBtnText: string = "follow";




  constructor(private router: Router, private noteService: NoteService,
     private profileService: ProfileService, private followService : FollowService) {

    console.log("state : " + this.router.getCurrentNavigation()?.extras?.state?.['redirect']);
    this.searchKeyword = this.router.getCurrentNavigation()?.extras?.state?.['redirect'];
  }

  ngOnInit() {

      //  const {redirect} = this.router.getCurrentNavigation()?.extras?.state?.redirect;
      //  this.tag.tag = redirect;

      this.noteService.getNotesByTag(this.searchKeyword).subscribe(
        (result : any) => {this.searchedTag = result;

        // this.searchedTag.notes.forEach(note => {
        //   console.log("mainphotoURL:  " + note.mainPhotourl);
        // });

        // for(var note in this.searchedTag.notes){
        //     console.log("this.tagList[tag] :  " + this.searchedTag.notes[note].mainPhotourl );
        // }
      },
      error => {console.log('çalışmadı'); });

  }

  searchNote(){

    this.noteService.getNotesByTag(this.searchKeyword).subscribe(
      (result : any) => {this.searchedTag = result;
        console.log("searchNote worked!!");
    },
    error => {console.log('çalışmadı'); });
  }

  searchPeople(){
    let token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token as string);
    this.followerId = this.decodedToken.nameid;

    let params = new HttpParams()
    .set("searchKeyword", this.searchKeyword)
    .set("followerId", this.followerId);

    this.profileService.getSearchedUsers(params).subscribe(
      (result : any ) => {
        // followeeId
         this.searchedPeople = result;
         console.log(  "");

         this.searchedPeople.forEach(element => {
            console.log(" following info about " + element.username + " is " + element.isFollowed)
            if(element.isFollowed == true) element.followInfo = "unfollow"
            else element.followInfo = "follow"
        });

        //  for (let index = 0; index < this.searchedPeople.length; index++) {
        //   const element = this.searchedPeople[index].isfollowed;
        //  }
        //  this.followService.getFollowInfo().subscribe(
        //  (result : any) => {

        //  });

        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];

        // }
      },
      error => {console.log('profileService getUsers doesnt work')});
  }

  selectedTabChange(changeEvent: MatTabChangeEvent){
    console.log('Index of tab : ' + changeEvent.index);

    if(changeEvent.index == 0){
      this.searchNote();
    }else{
      this.searchPeople();
    }

  }

  getDecodedAccessToken(token : string): any{
      try {
        return jwt_decode(token);
      } catch (error) {
        return null;
      }
  }

  FollowWriter(element: any, item: any){
    //getting user info
    let token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token as string);
    this.followerId = this.decodedToken.nameid;

    this.followerModel = {
    followerId: this.followerId,
    // getting id about followee
    followeeId: item
    };

    console.log("followerID " + this.followerId + "followeeID " + item);

      if(element.innerText == 'follow'){
        console.log("innerhtml is ok");
            this.followService.followWriter(this.followerModel).subscribe((result : any) => {
              console.log("followservice is ok for unfollow");
        if (result === 1) {
          console.log("followservice is worked with 1");
          element.innerText = "unfollow";
        // this.isFollow  = !this.isFollow;
      }
    },
      error => console.log("followriter func not worked.."));
      }
      if(element.innerText == 'unfollow') {
        console.log("innerhtml is ok for unfollow");
        this.followService.unfollowWriter(this.followerModel).subscribe((result : any) => {
        if (result === 1) {
        element.innerText = "follow";
        // this.isFollow  = !this.isFollow;
        }
      },
        error => console.log("unfollowriter func not worked.."));
      }





  }

  //UnfollowWriter(){
  //   // this.followService.unfollowWriter().subscribe((result : any) =>
  //   //   {
  //   //     console.log("followriter func worked..");
  //   //   },
  //   //   error => console.log("followriter func not worked..")
  //   // )
  // }

}
