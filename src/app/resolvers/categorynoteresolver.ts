import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Injectable()
export class Categorynoteresolver implements Resolve<Note[]> {

  constructor(private noteService: NoteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Note[]> {
      return this.noteService.getNotes(route.params['id']).pipe(
          catchError(error => {
              console.log('note resolver fail');
              this.router.navigate(['/home']);
              return of(null);
          })
      );
  }
}
