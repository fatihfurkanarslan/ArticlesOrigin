import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './../../models/comment';
import { CommentService } from './../../services/comment.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Note } from 'src/app/models/note';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notecomments',
  templateUrl: './notecomments.component.html',
  styleUrls: ['./notecomments.component.css']
})
export class NotecommentsComponent implements OnInit {

  @Input() note: Note;

  model: any = {};
  id!: number;

  form: FormGroup = new FormGroup({
    Text: new FormControl(''),
  });

  constructor(private commentService: CommentService, private authService: AuthService, private httpClient: HttpClient) { }


  ngOnInit() {
    this.id = +this.authService.decodedToken.nameid;
    console.log('name and userId in comment component :' + this.id);
  }

  onSubmit() {

    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.model.IPAddress = ""+res.ip;
      console.log("idadress : " + this.model.IPAddress);
    });

    this.model.userId = this.id;
    this.model.noteId = this.note.id;

    this.commentService.insertComment(this.model).subscribe(data => {
      this.model.text = '';
      console.log('success to insert comment :' + data);

    }, error => {
      console.log('failed to insert comment :' + error);
    });
  }



}
