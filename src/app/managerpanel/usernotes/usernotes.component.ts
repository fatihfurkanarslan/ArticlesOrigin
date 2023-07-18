import { Component, OnInit, ɵConsole, ChangeDetectorRef } from '@angular/core';
import { NoteService } from './../../services/note.service';

import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from './../DeleteDialog/DeleteDialog.component';
import { Note } from './../../models/note';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usernotes',
  templateUrl: './usernotes.component.html',
  styleUrls: ['./usernotes.component.css']
})
export class UsernotesComponent implements OnInit {

  notes: Note[] = [];
  userId!: number;
  draftNotes: any ;
  realNotes: any;

  displayedColumns: string[] = ['title', 'onModified', 'delete', 'edit'];
  dataSrc : any;

  data: boolean = false;

  constructor(private noteService: NoteService, private authService: AuthService,
     private router: Router, public dialog: MatDialog, private changeDetectRefs: ChangeDetectorRef) { }

  ngOnInit() {

    this.userId = this.authService.decodedToken.nameid;

    this.noteService.getDraftNotes(this.userId).subscribe((result) => {

      

      this.draftNotes = new MatTableDataSource(result);
      this.realNotes = new MatTableDataSource(result);
      console.log(" Im in usernotes ");


      this.draftNotes.filterPredicate = (data: any, filter: boolean) => {
      
return (data.isDraft === filter);
};
this.draftNotes.filter = true;

this.realNotes.filterPredicate = (data: any, filter: boolean) => {
  return (data.isDraft !== filter);
  };
  this.realNotes.filter = true;

      // this.dataSrc = new MatTableDataSource(result);
    //   result.forEach(eachObj => {
    //     if (eachObj.isDraft === true){
    //         this.draftNotes.push(eachObj);
    //     }
    //     if (eachObj.isDraft === false){
    //       this.realNotes.push(eachObj);
    //     }
    // });
 // this.dataSrc = result;
       result.forEach( x => {
          if(x.title == null){    
              //regex e bak       
              //x.text.replace(/(<p>)|(</p>)|(<header>)|(</header>)/g/, '');
              x.title = x.text;        
          }         
        })

       this.notes = result;
       
      
    },
      error => {
         console.log('getdrafts methods failed');
        });
  }

  openDialog(id: number){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        result => {this.data = result;
          if (this.data === true) {
            this.deleteNote(id);
          }
      }
    );
  }



  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe(response => {
      console.log('basarılı');
      this.refresh();
   });
    // this.notes = this.notes.filter(item => item.id !== noteId);
    // console.log('filter');
  }

  editNote(note: Note) {
    localStorage.removeItem('editNoteId');
    localStorage.setItem('editNoteId', note.id.toString());
    this.router.navigate(['/editnote']);
  }

  refresh() {
    this.noteService.getDraftNotes(this.userId).subscribe((result) => {
      this.draftNotes = new MatTableDataSource(result);
      this.realNotes = new MatTableDataSource(result);
      this.draftNotes.filterPredicate = (data: any, filter: boolean) => {
        return (data.isDraft === filter);
        };
        this.draftNotes.filter = true;

        this.realNotes.filterPredicate = (data: any, filter: boolean) => {
          return (data.isDraft !== filter);
          };
          this.realNotes.filter = true;
    },
    error => {
       console.log('getdrafts methods failed');
      });

  }


}
