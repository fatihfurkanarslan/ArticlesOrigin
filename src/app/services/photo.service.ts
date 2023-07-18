import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';

const httpOptionsFormData = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('content', 'formData')
};

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = environment.apiUrl + 'photo/';

  constructor(private http: HttpClient) { }

  insertPhoto(photoToInsert: FormData): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'insert', photoToInsert, httpOptionsFormData);
  }

}
