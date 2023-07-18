import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../services/category.service';
import { Category } from './../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  rownumber: number;
  rows:any;
  columnnumbers:any;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe(result => {
      this.categories = result;

      this.rownumber = Math.ceil(this.categories.length / 3);
      this.rows = Array(this.rownumber).fill(0).map(( x , i ) => i);

      this.columnnumbers = Array(3).fill(0).map(( x , i ) => i);

    });
  }

}
