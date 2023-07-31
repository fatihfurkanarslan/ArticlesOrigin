import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from './../models/note';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

notes: Note[] = [];
popularNotes: Note[] = [];
pageNumber: number = 1;

  constructor(private noteService: NoteService, private route: ActivatedRoute) {
   }

  ngOnInit() {

      // this.route.data.subscribe(data => {
      //   this.notes = data['notes'];
      // });
      this.getNotes();
      this.getPopularNotes();
  }

  getNotes(){
    this.noteService.getNotesWithScroll(this.pageNumber)
    .subscribe((result) => {
      this.onSuccess(result);
    },
    error => console.log(error));
  }

  getPopularNotes(){
    this.noteService.getPopularNotes()
    .subscribe((result) => {
      this.popularNotes = result;
    },
    error => console.log(error));
  }

  onSuccess(result:any) {
    if (result !== undefined && result.length !== 0) {
      result.forEach((item:any) => {
        if (item.isDraft === false) {
          this.notes.push(item);
        }
      });
    }
  }

  onScroll() {
    this.pageNumber = this.pageNumber + 1;
    this.getNotes();
  }

}
