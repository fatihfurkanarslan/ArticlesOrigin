import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-category-note',
  templateUrl: './category-note.component.html',
  styleUrls: ['./category-note.component.css']
})
export class CategoryNoteComponent implements OnInit {


  id: number;
  private sub: any;
  notes: Note[];
  noteText: string;
  categoryName: string;

  constructor(private noteService: NoteService, private route: ActivatedRoute,  private categoryService: CategoryService) { }

  ngOnInit() {

    // this.route.data.subscribe(data => {
    //   this.notes = data['notes'];
    // });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.categoryService.getCategory(this.id).subscribe(result => {
      this.categoryName = result.categoryname;
    });

    this.noteService.getNotes(this.id).subscribe((data: Note[]) => {this.notes = data; },
     error => console.log('failed note get methoud'));
  }

}
