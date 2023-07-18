import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-DeleteDialog',
  templateUrl: './DeleteDialog.component.html',
  styleUrls: ['./DeleteDialog.component.css']
})
export class DeleteDialogComponent implements OnInit {


  constructor(
      private dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any) {

  }

  ngOnInit() {
  }


  close() {
      this.dialogRef.close(false);
  }

  save() {

    this.dialogRef.close(true);

  }

}
