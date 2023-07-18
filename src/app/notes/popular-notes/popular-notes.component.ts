import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-popular-notes',
  templateUrl: './popular-notes.component.html',
  styleUrls: ['./popular-notes.component.css']
})
export class PopularNotesComponent implements OnInit {

  @Input() note: Note;

  constructor() { }

  ngOnInit() {
  }

}
