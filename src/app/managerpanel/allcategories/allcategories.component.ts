import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { Category } from './../../models/category';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DeleteDialogComponent } from './../DeleteDialog/DeleteDialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrls: ['./allcategories.component.css']
})
export class AllcategoriesComponent implements OnInit {

  displayedColumns: string[] = ['title', 'description', 'onModified', 'delete', 'edit'];
  dataSource:any;
  id: number;

  data: boolean;


  constructor(private categoryService: CategoryService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(cats => {
      this.dataSource = cats;  },
      error => {
        console.log(error);
      });
  }

  deleteCategory(categoryId: number) {
        this.categoryService.deleteCategory(categoryId).subscribe(response => {console.log('basarılı'); });
        this.id = categoryId;
        // this.categories = this.categories.filter(item => item.id !== categoryId);
        this.refresh();
  }

  openDialog(id: number){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        result => {this.data = result;
          if (this.data === true) {
            this.deleteCategory(id);
          }
      }
    );
  }

  editCategory(category: Category) {
    localStorage.removeItem('editCategoryId');
    localStorage.setItem('editCategoryId', category.id.toString());
    this.router.navigate(['/editcategory']);
  }

  refresh() {
    this.categoryService.getCategories().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data:any, filter: number) => {
        return (data.id !== filter);
        };

        this.dataSource.filter = this.id;

    },
    error => {
       console.log('getdrafts methods failed');
      });

  }

}

