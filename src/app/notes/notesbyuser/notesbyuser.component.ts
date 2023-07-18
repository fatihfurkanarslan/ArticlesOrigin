import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-notesbyuser',
  templateUrl: './notesbyuser.component.html',
  styleUrls: ['./notesbyuser.component.css']
})
export class NotesbyuserComponent implements OnInit {

  id: any;
  notes: Note[] = [];

  constructor(private route: ActivatedRoute, private noteServie: NoteService) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.noteServie.getDraftNotes(this.id).subscribe(result => {
        this.notes = result;
    });
  }

}
