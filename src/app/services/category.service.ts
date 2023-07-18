import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('Content-type', 'application/json')
};

const httpOptionsFormData = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('content', 'formData')
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = environment.apiUrl + 'category/';

constructor(private http: HttpClient) { }

getCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(this.apiUrl + 'getcategories', httpOptions);
}

getCategory(categoryId: number): Observable<Category> {
  return this.http.get<Category>(this.apiUrl + 'getcategory/' + categoryId, httpOptions);
}

insertCategory(categoryToInsert: FormData): Observable<any> {
  return this.http.post<any>(this.apiUrl + 'insert', categoryToInsert, httpOptionsFormData);
}

deleteCategory(categoryId: number): Observable<Category> {
  return this.http.delete<Category>(this.apiUrl + 'delete/' + categoryId, httpOptions);
}

updateCategory(category: FormData): Observable<Category> {
  return this.http.put<Category>(this.apiUrl + 'update', category, httpOptionsFormData);
}

}
